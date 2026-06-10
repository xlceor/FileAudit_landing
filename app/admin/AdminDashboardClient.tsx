'use client';

import React, { useState, useTransition } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Plus, 
  RefreshCw, 
  Trash2, 
  XCircle, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  LogOut, 
  Fingerprint, 
  Calendar, 
  Clock, 
  Filter, 
  Sparkles,
  HelpCircle,
  Hash,
  ShieldCheck,
  ShieldAlert,
  ArrowUpCircle,
  ToggleLeft,
  ToggleRight,
  Globe,
  FileCode
} from 'lucide-react';
import { 
  generateLicensesAction, 
  resetLicenseAction, 
  revokeLicenseAction, 
  restoreLicenseAction, 
  deleteLicenseAction, 
  logoutAction,
  createReleaseAction,
  toggleReleaseActiveAction,
  deleteReleaseAction
} from '@/lib/actions';

interface License {
  id: string;
  license_key: string;
  status: 'unused' | 'activated' | 'revoked';
  machine_fingerprint: string | null;
  created_at: string | null;
  last_validated_at: string | null;
}

interface Release {
  id: string;
  version: string;
  download_url: string;
  sha256: string;
  is_active: boolean;
  created_at: string | null;
}

interface AdminDashboardClientProps {
  initialLicenses: License[];
  initialReleases: Release[];
  userEmail: string;
}

export default function AdminDashboardClient({ initialLicenses, initialReleases = [], userEmail }: AdminDashboardClientProps) {
  const [licenses, setLicenses] = useState<License[]>(initialLicenses);
  const [releases, setReleases] = useState<Release[]>(initialReleases);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unused' | 'activated' | 'revoked'>('all');
  const [generateCount, setGenerateCount] = useState(5);
  
  // Release Form Fields
  const [releaseVersion, setReleaseVersion] = useState('');
  const [releaseUrl, setReleaseUrl] = useState('');
  const [releaseHash, setReleaseHash] = useState('');
  const [releaseActive, setReleaseActive] = useState(true);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filter licenses based on search and status
  const filteredLicenses = licenses.filter(lic => {
    const matchesSearch = lic.license_key.toLowerCase().includes(search.toLowerCase()) || 
      (lic.machine_fingerprint && lic.machine_fingerprint.toLowerCase().includes(search.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lic.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const unusedCount = licenses.filter(l => l.status === 'unused').length;
  const activatedCount = licenses.filter(l => l.status === 'activated').length;
  const revokedCount = licenses.filter(l => l.status === 'revoked').length;

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 5000);
  };

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generateLicensesAction(generateCount);
      if (result.success) {
        showFeedback('success', `Successfully created ${result.count} premium lifetime keys.`);
        window.location.reload();
      } else {
        showFeedback('error', result.error || 'Failed to generate keys.');
      }
    });
  };

  const handleReset = (id: string, key: string) => {
    if (!confirm(`Are you sure you want to reset license key ${key}? This will clear the hardware signature and permit reactivation.`)) return;
    
    startTransition(async () => {
      const result = await resetLicenseAction(id);
      if (result.success) {
        showFeedback('success', `License key ${key} has been reset. Unlocked for migrations.`);
        setLicenses(prev => prev.map(lic => lic.id === id ? { ...lic, status: 'unused', machine_fingerprint: null, last_validated_at: null } : lic));
      } else {
        showFeedback('error', result.error || 'Failed to reset license.');
      }
    });
  };

  const handleRevoke = (id: string, key: string) => {
    if (!confirm(`Are you sure you want to revoke license key ${key}? This will block any further operations instantly.`)) return;

    startTransition(async () => {
      const result = await revokeLicenseAction(id);
      if (result.success) {
        showFeedback('success', `License key ${key} has been revoked.`);
        setLicenses(prev => prev.map(lic => lic.id === id ? { ...lic, status: 'revoked' } : lic));
      } else {
        showFeedback('error', result.error || 'Failed to revoke license.');
      }
    });
  };

  const handleRestore = (id: string, key: string) => {
    startTransition(async () => {
      const result = await restoreLicenseAction(id);
      if (result.success) {
        showFeedback('success', `License key ${key} has been restored successfully.`);
        window.location.reload();
      } else {
        showFeedback('error', result.error || 'Failed to restore license.');
      }
    });
  };

  const handleDelete = (id: string, key: string) => {
    if (!confirm(`WARNING: Are you sure you want to permanently delete license key ${key}? This action cannot be undone.`)) return;

    startTransition(async () => {
      const result = await deleteLicenseAction(id);
      if (result.success) {
        showFeedback('success', `License key ${key} has been purged.`);
        setLicenses(prev => prev.filter(lic => lic.id !== id));
      } else {
        showFeedback('error', result.error || 'Failed to delete license.');
      }
    });
  };

  // Release Handlers
  const handleCreateRelease = () => {
    if (!releaseVersion || !releaseUrl || !releaseHash) {
      showFeedback('error', 'Please fill out all release fields.');
      return;
    }

    startTransition(async () => {
      const result = await createReleaseAction(releaseVersion, releaseUrl, releaseHash, releaseActive);
      if (result.success) {
        showFeedback('success', `Successfully published OTA release version ${releaseVersion}`);
        setReleaseVersion('');
        setReleaseUrl('');
        setReleaseHash('');
        window.location.reload();
      } else {
        showFeedback('error', result.error || 'Failed to create release.');
      }
    });
  };

  const handleToggleReleaseActive = (id: string, currentStatus: boolean, version: string) => {
    startTransition(async () => {
      const result = await toggleReleaseActiveAction(id, currentStatus);
      if (result.success) {
        const nextStatus = !currentStatus;
        showFeedback('success', `Release ${version} is now ${nextStatus ? 'ACTIVE (Clients will auto-update to this)' : 'INACTIVE'}`);
        window.location.reload();
      } else {
        showFeedback('error', result.error || 'Failed to toggle active status.');
      }
    });
  };

  const handleDeleteRelease = (id: string, version: string) => {
    if (!confirm(`Are you sure you want to permanently delete release ${version} from the updates list?`)) return;

    startTransition(async () => {
      const result = await deleteReleaseAction(id);
      if (result.success) {
        showFeedback('success', `Release ${version} deleted successfully.`);
        setReleases(prev => prev.filter(r => r.id !== id));
      } else {
        showFeedback('error', result.error || 'Failed to delete release.');
      }
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-violet-500 selection:text-white flex flex-col">
      
      {/* Top Admin Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 rounded-xl">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-white">FileMaster</span>
                <span className="bg-violet-500/15 border border-violet-500/30 text-violet-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Licensing Server</span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">Logged in as <span className="text-violet-400 font-semibold">{userEmail}</span></p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-all disabled:opacity-50"
          >
            <LogOut className="h-4 w-4 text-slate-500" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* Toast feedback alerts */}
        {feedback && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 shadow-lg max-w-3xl animate-fadeIn ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block text-sm">{feedback.type === 'success' ? 'Operation Completed' : 'Operation Blocked'}</span>
              <p className="text-xs mt-0.5 leading-relaxed">{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Global Analytics Overview Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute top-6 right-6 text-slate-700"><Key className="h-6 w-6" /></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Total Licenses issued</span>
            <span className="text-3xl font-black text-white">{licenses.length}</span>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">Count holds active, unused, revoked</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute top-6 right-6 text-emerald-800"><CheckCircle2 className="h-6 w-6" /></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Active Bindings</span>
            <span className="text-3xl font-black text-emerald-400">{activatedCount}</span>
            <p className="text-[10px] text-emerald-500/80 mt-2 font-mono">Tied securely to host motherboard BIOS</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute top-6 right-6 text-violet-800"><Sparkles className="h-6 w-6" /></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Available Keys</span>
            <span className="text-3xl font-black text-violet-400">{unusedCount}</span>
            <p className="text-[10px] text-violet-500/80 mt-2 font-mono">Awaiting customer activations</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute top-6 right-6 text-rose-800"><ArrowUpCircle className="h-6 w-6" /></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">OTA App Release</span>
            <span className="text-3xl font-black text-violet-400">
              {releases.find(r => r.is_active)?.version || 'None'}
            </span>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">Active version for desktop client updates</p>
          </div>
        </div>

        {/* ==================== OTA UPDATES & APP RELEASES SECTION ==================== */}
        <section className="border border-slate-800 rounded-3xl p-6 bg-slate-900/20 relative space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
            <ArrowUpCircle className="h-6 w-6 text-violet-400 animate-pulse" />
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight">FileMaster OTA Deployment</h2>
              <p className="text-slate-400 text-xs mt-0.5">Publish new binary patches and manage rolling updates dynamically.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Publish Release Form */}
            <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-violet-400" /> Publish New Version
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Version Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1.3.1"
                    value={releaseVersion}
                    onChange={(e) => setReleaseVersion(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Zip Download URL</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600"><Globe className="h-3.5 w-3.5" /></span>
                    <input 
                      type="url" 
                      placeholder="https://cdn.example.com/patch.zip"
                      value={releaseUrl}
                      onChange={(e) => setReleaseUrl(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 py-3 pl-9 pr-3 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1">Zip SHA-256 Checksum</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600"><FileCode className="h-3.5 w-3.5" /></span>
                    <input 
                      type="text" 
                      placeholder="64-character hex hash"
                      value={releaseHash}
                      onChange={(e) => setReleaseHash(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 py-3 pl-9 pr-3 text-slate-100 placeholder:text-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="makeActive" 
                    checked={releaseActive} 
                    onChange={(e) => setReleaseActive(e.target.checked)}
                    className="rounded bg-slate-950 border border-slate-800 text-violet-500 focus:ring-violet-500 w-4 h-4" 
                  />
                  <label htmlFor="makeActive" className="text-slate-300 font-semibold cursor-pointer">Activate immediately for all clients</label>
                </div>

                <button
                  onClick={handleCreateRelease}
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-xs uppercase tracking-wider mt-2"
                >
                  <Plus className="h-4 w-4" /> Publish OTA patch
                </button>
              </div>
            </div>

            {/* Releases Manifest Table */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-850 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                      <th className="p-3 pl-5">Version</th>
                      <th className="p-3">Deploy Status</th>
                      <th className="p-3">SHA-256 Hash</th>
                      <th className="p-3">Created</th>
                      <th className="p-3 text-right pr-5">Control Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    {releases.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center p-6 text-slate-500 font-mono">
                          No release history tracked.
                        </td>
                      </tr>
                    ) : (
                      releases.map((rel) => (
                        <tr key={rel.id} className="hover:bg-slate-900/10 transition-all">
                          {/* Version */}
                          <td className="p-3 pl-5">
                            <span className="font-mono font-black text-violet-400 bg-violet-950/20 border border-violet-500/10 px-2 py-1 rounded-lg">
                              v{rel.version}
                            </span>
                          </td>

                          {/* Active Toggle */}
                          <td className="p-3">
                            {rel.is_active ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase text-[9px] font-extrabold tracking-wider">
                                Active Release
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full uppercase text-[9px] font-extrabold tracking-wider">
                                Archived
                              </span>
                            )}
                          </td>

                          {/* Hash */}
                          <td className="p-3 max-w-[180px]">
                            <div className="font-mono text-slate-500 truncate" title={rel.sha256}>
                              {rel.sha256}
                            </div>
                          </td>

                          {/* Date */}
                          <td className="p-3 text-slate-500 font-mono">
                            {rel.created_at ? new Date(rel.created_at).toLocaleDateString() : '—'}
                          </td>

                          {/* Actions */}
                          <td className="p-3 text-right pr-5">
                            <div className="flex items-center justify-end gap-2">
                              {/* Toggle active button */}
                              <button
                                onClick={() => handleToggleReleaseActive(rel.id, rel.is_active, rel.version)}
                                disabled={isPending}
                                title={rel.is_active ? "Deactivate auto-updates for this version" : "Deploys this version to all clients!"}
                                className={`p-1.5 border rounded-lg transition-all ${
                                  rel.is_active 
                                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 hover:text-emerald-300' 
                                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                {rel.is_active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                              </button>

                              {/* Delete release */}
                              <button
                                onClick={() => handleDeleteRelease(rel.id, rel.version)}
                                disabled={isPending || rel.is_active}
                                title="Delete update"
                                className="p-1.5 bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-slate-500 hover:text-rose-500 rounded-lg transition-all disabled:opacity-40"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Generator Controls & Table Filters Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Key Generator Form */}
          <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent rounded-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80">
              <Key className="h-5 w-5 text-violet-400" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">Bulk Key Generator</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Quantity to Generate</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                    <Hash className="h-4 w-4" />
                  </span>
                  <input 
                    type="number"
                    min="1"
                    max="100"
                    value={generateCount}
                    onChange={(e) => setGenerateCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="block w-full rounded-xl bg-slate-950 border border-slate-800 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-500">Keys are generated instantly using standard hexagonal chunks layout.</span>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-violet-500/10 hover:shadow-violet-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider"
              >
                {isPending ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Generating in database...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Generate Premium Keys
                  </>
                )}
              </button>
            </div>

            {/* Quick manual note detailing schema format */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 space-y-3">
              <span className="text-slate-300 font-bold text-xs flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-violet-400" /> Key Standard Spec
              </span>
              <p className="text-[11px] text-slate-500 leading-normal">
                Generates cryptographically random identifiers of format: <code className="text-violet-400 font-mono">FM-F2A8-94D1-EBC2-0941</code>. Newly generated keys are labeled unused.
              </p>
            </div>
          </div>

          {/* Licenses Database Table and Controls */}
          <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl pointer-events-none" />

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                  <Search className="h-4 w-4" />
                </span>
                <input 
                  type="text"
                  placeholder="Search key or machine fingerprint..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full rounded-xl bg-slate-950 border border-slate-800 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1.5 rounded-xl">
                <span className="text-slate-500 text-xs px-2.5 font-bold uppercase tracking-wider flex items-center gap-1"><Filter className="h-3.5 w-3.5" /> Filter</span>
                <div className="flex gap-1">
                  {(['all', 'unused', 'activated', 'revoked'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all uppercase ${
                        statusFilter === filter 
                          ? 'bg-violet-500/25 text-violet-400 border border-violet-500/30 font-bold' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real Licenses Table */}
            <div className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-850 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                      <th className="p-4 pl-6">License Key</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Hardware Signature</th>
                      <th className="p-4">Timeline</th>
                      <th className="p-4 text-right pr-6">Database Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    {filteredLicenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8 text-slate-500 text-xs font-medium font-mono">
                          No matching records found in Supabase databases.
                        </td>
                      </tr>
                    ) : (
                      filteredLicenses.map((lic) => (
                        <tr key={lic.id} className="hover:bg-slate-900/20 transition-all group">
                          {/* Key */}
                          <td className="p-4 pl-6">
                            <span className="font-mono text-xs text-violet-400 font-extrabold tracking-wider bg-violet-950/20 border border-violet-500/10 px-2.5 py-1.5 rounded-lg block w-fit shadow-inner">
                              {lic.license_key}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="p-4">
                            {lic.status === 'unused' && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-violet-500/15 border border-violet-500/20 text-violet-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" /> Unused
                              </span>
                            )}
                            {lic.status === 'activated' && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Activated
                              </span>
                            )}
                            {lic.status === 'revoked' && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-rose-500/15 border border-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" /> Revoked
                              </span>
                            )}
                          </td>

                          {/* Hardware Fingerprint */}
                          <td className="p-4 max-w-[200px]">
                            {lic.machine_fingerprint ? (
                              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-slate-300">
                                <Fingerprint className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                                <span className="truncate" title={lic.machine_fingerprint}>{lic.machine_fingerprint}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-xs font-mono">None bound</span>
                            )}
                          </td>

                          {/* Timestamps */}
                          <td className="p-4 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span>Created: {lic.created_at ? new Date(lic.created_at).toLocaleDateString() : '—'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span>Validated: {lic.last_validated_at ? new Date(lic.last_validated_at).toLocaleDateString() : 'Never'}</span>
                            </div>
                          </td>

                          {/* Database action operations */}
                          <td className="p-4 text-right pr-6">
                            <div className="flex items-center justify-end gap-2">
                              {/* Reset action button */}
                              {(lic.status === 'activated' || lic.machine_fingerprint) && (
                                <button
                                  onClick={() => handleReset(lic.id, lic.license_key)}
                                  disabled={isPending}
                                  title="Reset License (Migration workflow)"
                                  className="p-2 bg-slate-900 border border-slate-800 hover:border-violet-500/30 text-slate-400 hover:text-violet-400 rounded-xl transition-all disabled:opacity-50"
                                >
                                  <RefreshCw className="h-3.5 w-3.5" />
                                </button>
                              )}

                              {/* Revoke/Restore action button */}
                              {lic.status !== 'revoked' ? (
                                <button
                                  onClick={() => handleRevoke(lic.id, lic.license_key)}
                                  disabled={isPending}
                                  title="Revoke License Key"
                                  className="p-2 bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-xl transition-all disabled:opacity-50"
                                >
                                  <ShieldAlert className="h-3.5 w-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleRestore(lic.id, lic.license_key)}
                                  disabled={isPending}
                                  title="Restore Key Status"
                                  className="p-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 rounded-xl transition-all disabled:opacity-50"
                                >
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                </button>
                              )}

                              {/* Delete Action */}
                              <button
                                onClick={() => handleDelete(lic.id, lic.license_key)}
                                disabled={isPending}
                                title="Purge key permanently"
                                className="p-2 bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-slate-500 hover:text-rose-500 rounded-xl transition-all disabled:opacity-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 font-mono px-2 pt-2">
              <span>Showing {filteredLicenses.length} of {licenses.length} premium licenses</span>
              <span className="hidden sm:inline">Supabase Database Node (Vercel Secure Client TLS/HTTPS)</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 mt-12">
        <p>&copy; {new Date().getFullYear()} FileMaster licensing platform. Encrypted administration area.</p>
      </footer>
    </div>
  );
}
