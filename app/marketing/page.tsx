import React from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  Code, 
  Layers, 
  Workflow, 
  Zap, 
  Sparkles, 
  Cpu, 
  FileCode, 
  Database,
  ArrowRight,
  Fingerprint,
  RotateCw,
  XCircle,
  HelpCircle,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-violet-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-violet-500/20">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-violet-400">
              FileMaster
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-violet-400 transition-colors">About</a>
            <a href="#features" className="hover:text-violet-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-violet-400 transition-colors">How it Works</a>
            <a href="#licensing" className="hover:text-violet-400 transition-colors">Licensing Model</a>
            <a href="#faq" className="hover:text-violet-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-800/80 transition-all shadow-inner"
            >
              Admin Portal
            </Link>
            <a 
              href="#download" 
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all"
            >
              Get Desktop App <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-8 animate-pulse shadow-inner">
          <Sparkles className="h-3.5 w-3.5" /> High-Performance Desktop Audit Suite
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl leading-[1.1] mb-6">
          Reconcile files with your database at{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400">
            Light Speed
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-xl max-w-3xl leading-relaxed mb-10">
          FileMaster solves the core data integrity issue: matching physical directories and storage dumps against master records in Excel, CSV, or JSON formats. Perfect for high-volume enterprise pipelines.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#download" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all"
          >
            Download Desktop Client <ArrowRight className="h-5 w-5" />
          </a>
          <a 
            href="#features" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-8 py-4 rounded-2xl hover:bg-slate-800/80 transition-all"
          >
            Explore Core Engines
          </a>
        </div>

        {/* Dashboard Preview mockup */}
        <div className="mt-16 w-full max-w-5xl bg-slate-900/40 border border-slate-800 rounded-2xl p-4 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent rounded-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 block" />
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 block" />
              <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 block" />
            </div>
            <div className="text-xs font-mono text-slate-500 bg-slate-950 px-4 py-1 rounded-md border border-slate-800/50">
              FileMaster Desktop — Operation: Folder vs Master Excel
            </div>
            <div className="w-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">Expected Records</div>
              <div className="text-2xl font-black text-violet-400">125,480</div>
              <div className="text-[10px] text-slate-500 mt-1">Master Excel database load</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">Found (Encontrados)</div>
              <div className="text-2xl font-black text-emerald-400">121,043</div>
              <div className="text-[10px] text-emerald-500/80 mt-1">[OK] 96.4% Completion Arc</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">Missing (Faltantes)</div>
              <div className="text-2xl font-black text-rose-500">4,127</div>
              <div className="text-[10px] text-rose-500/80 mt-1"> Expected but not on disk</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">Extra (Sobrantes)</div>
              <div className="text-2xl font-black text-amber-500">310</div>
              <div className="text-[10px] text-amber-500/80 mt-1">ℹ On disk but unrecorded</div>
            </div>
          </div>

          {/* Canvas visualization simulation */}
          <div className="mt-4 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 justify-around">
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* SVG circular progress representation */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                  <circle cx="56" cy="56" r="48" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="301.6" strokeDashoffset="10.8" />
                </svg>
                <div className="text-center">
                  <div className="text-lg font-black text-white">96.4%</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Audit Score</div>
                </div>
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-sm font-bold text-slate-200">Reconciliation Successful</h4>
                <p className="text-xs text-slate-400 max-w-xs">Set algebra logic mapped in 0.04s. Background worker thread returned safe process handle.</p>
              </div>
            </div>

            <div className="flex gap-2 self-stretch items-end h-24 pt-4 px-4 border-t sm:border-t-0 sm:border-l border-slate-800 w-full max-w-sm">
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: '95%' }} />
                <span className="text-[9px] text-slate-500 font-bold">Found</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-rose-500 rounded-t-sm" style={{ height: '24%' }} />
                <span className="text-[9px] text-slate-500 font-bold">Missing</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-amber-500 rounded-t-sm" style={{ height: '8%' }} />
                <span className="text-[9px] text-slate-500 font-bold">Extra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operation Modes Showcase */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-xs text-violet-400 uppercase tracking-widest font-extrabold mb-3">Modular Engine Architectures</h2>
          <p className="text-3xl sm:text-5xl font-black text-white max-w-3xl mx-auto tracking-tight leading-tight">
            Designed for structural workflows & high payloads
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-bl-full pointer-events-none group-hover:bg-violet-600/10 transition-colors" />
            <div className="bg-violet-500/10 text-violet-400 p-4 rounded-xl w-fit mb-6 border border-violet-500/20">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">Folder Export Mode</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Traverse target directories containing millions of files. Uses modern native system calls to map folder structures and export optimized, indexed files with active metadata templates automatically.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 mt-4 border-t border-slate-800/80 pt-4 font-mono">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Infinite recursive depth</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Path clean up ({'{}'} standardizer)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Auto openpyxl styling</li>
            </ul>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-bl-full pointer-events-none group-hover:bg-violet-600/10 transition-colors" />
            <div className="bg-violet-500/10 text-violet-400 p-4 rounded-xl w-fit mb-6 border border-violet-500/20">
              <Workflow className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">Folder vs. Master Excel</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Reconciles physical folders against expected identifiers from multi-column corporate templates. Maps file stems, ignores trailing extensions, and outputs three precise categorical subsets.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 mt-4 border-t border-slate-800/80 pt-4 font-mono">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Prefix Extraction Preprocessing</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Extension & Case-agnostic</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> O(1) set-algebra search complexity</li>
            </ul>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-bl-full pointer-events-none group-hover:bg-violet-600/10 transition-colors" />
            <div className="bg-violet-500/10 text-violet-400 p-4 rounded-xl w-fit mb-6 border border-violet-500/20">
              <FileCode className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">Excel vs. Master Excel</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Performs direct data-source auditing without file-system scans. Compare an input sheet of records with your master sheet database, sniffing custom column patterns for precise match logic.
            </p>
            <ul className="text-xs text-slate-500 space-y-2 mt-4 border-t border-slate-800/80 pt-4 font-mono">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Automatic CSV delimiter sniffing</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Dynamic column-header prioritization</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Blank trimmer & duplicate filter</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Technical Capabilities (The Core Engines) */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900 relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-xs text-violet-400 uppercase tracking-widest font-extrabold mb-3">Enterprise Grade Infrastructure</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Processing power engineered for raw data integrity
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Generic data tools lock, freeze, or choke when handling massive directories. FileMaster leverages Python sets and dynamic background-threaded workers, keeping the UI at 100% responsiveness while completing calculations in fractions of a second.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-slate-900 border border-slate-800 text-violet-400 p-2.5 rounded-xl h-fit">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Set-Algebra Math</h4>
                  <p className="text-slate-400 text-xs mt-1">Utilizes Python set intersections and differences instead of linear array search, cutting processing time from $O(N^2)$ to $O(N)$.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-slate-900 border border-slate-800 text-violet-400 p-2.5 rounded-xl h-fit">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Asynchronous Thread Worker</h4>
                  <p className="text-slate-400 text-xs mt-1">Spawns lightweight background operations for loader parsing and index writing, rendering uninterrupted UI frames.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-slate-900 border border-slate-800 text-violet-400 p-2.5 rounded-xl h-fit">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Dynamic Multi-format Connectors</h4>
                  <p className="text-slate-400 text-xs mt-1">Full-spectrum ingestion of CSV, JSON, XLSX, XLS with automatic sniffers for semicolon, comma, and tabular partitions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 lg:p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-2xl pointer-events-none" />
            <h4 className="text-xs text-violet-400 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Code className="h-4 w-4" /> Code Architecture Snippet: FileMaster comparison pipeline
            </h4>
            
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300">
              <div className="text-slate-500">// Optimized Python Loader & Set Reconciliation</div>
              <div><span className="text-violet-400">def</span> <span className="text-indigo-400">compare_sets</span>(expected_ids, disk_ids):</div>
              <div className="pl-4">expected = <span className="text-emerald-400">set</span>(expected_ids)</div>
              <div className="pl-4">actual = <span className="text-emerald-400">set</span>(disk_ids)</div>
              <div className="pl-4 text-slate-500"># O(1) Lookup complexity operations:</div>
              <div className="pl-4">found = expected & actual</div>
              <div className="pl-4">missing = expected - actual</div>
              <div className="pl-4">extra = actual - expected</div>
              <div className="pl-4"><span className="text-violet-400">return</span> {'{'}</div>
              <div className="pl-8"><span className="text-amber-400">"found"</span>: list(found),</div>
              <div className="pl-8"><span className="text-amber-400">"missing"</span>: list(missing),</div>
              <div className="pl-8"><span className="text-amber-400">"extra"</span>: list(extra),</div>
              <div className="pl-8"><span className="text-amber-400">"completion"</span>: len(found) / len(expected) <span className="text-violet-400">if</span> expected <span className="text-violet-400">else</span> <span className="text-indigo-400">1.0</span></div>
              <div className="pl-4">{'}'}</div>
              <div className="mt-4 text-slate-500">// Regex prefix-processor extraction logic</div>
              <div><span className="text-violet-400">def</span> <span className="text-indigo-400">extract_identifier</span>(filename, ignore_ext=<span className="text-indigo-400">True</span>):</div>
              <div className="pl-4">stem = Path(filename).stem <span className="text-violet-400">if</span> ignore_ext <span className="text-violet-400">else</span> filename</div>
              <div className="pl-4">normalized = stem.strip().lower()</div>
              <div className="pl-4">match = re.match(<span className="text-emerald-400">r"^([a-zA-Z0-9]+)[-_]"</span>, normalized)</div>
              <div className="pl-4"><span className="text-violet-400">return</span> match.group(<span className="text-indigo-400">1</span>) <span className="text-violet-400">if</span> match <span className="text-violet-400">else</span> normalized</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-white font-bold text-sm block mb-1">Pre-processing pipeline</span>
                <span className="text-slate-400 text-xs">Cleans up prefixes like AB123CD_photo.jpg to match against master raw records automatically.</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-white font-bold text-sm block mb-1">Grid alignment safety</span>
                <span className="text-slate-400 text-xs">Applies exact width padding based on maximum string lengths when writing final audit reports.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing Lifecycle Model */}
      <section id="licensing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-xs text-violet-400 uppercase tracking-widest font-extrabold mb-3">Lifetime Licensing Protocol</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white max-w-3xl mx-auto tracking-tight leading-tight">
            Lifetime Single-Machine Hardware Locking
          </h3>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-4">
            Pay once, use forever. Secure offline-first activation model with RS256 cryptographic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-4 border border-violet-500/20">
                <Zap className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">1. Hardware Fingerprint</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                App gathers BIOS UUID, processor attributes, system nodes, and architecture metadata, generating a stable 64-character SHA-256 hash completely locked to the physical processor.
              </p>
            </div>
            <span className="text-slate-600 text-xs font-mono mt-4">Client Offline Node</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-4 border border-violet-500/20">
                <Fingerprint className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">2. Secure Verification</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Verifies keys directly with standard REST headers inside Vercel. Stores hardware parameters and changes status from <span className="text-violet-400">unused</span> to <span className="text-emerald-400">activated</span>, recording dynamic activation timestamps.
              </p>
            </div>
            <span className="text-slate-600 text-xs font-mono mt-4">Next.js API Server</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-4 border border-violet-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">3. Signed JWT Lease</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                The license server signs the lease using an asymmetrically encrypted RS256 Private key. The lease carries keys, fingerprints, issued and expiry claims, stored locally inside <span className="text-violet-400">~/.filemaster_lease</span>.
              </p>
            </div>
            <span className="text-slate-600 text-xs font-mono mt-4">Vercel Environment Payload</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-4 border border-violet-500/20">
                <RotateCw className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">4. Daily Offline Check</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                On launch, the client reads the lease and decodes it using the RSA Public Key. It validates signature integrity, expiration, and ensures current device fingerprint matches the JWT claim. No internet required.
              </p>
            </div>
            <span className="text-slate-600 text-xs font-mono mt-4">PyArmor Obfuscated Verification</span>
          </div>
        </div>

        {/* Dynamic Verification Flow Mockup */}
        <div className="mt-12 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Flow Spec</span>
          <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6 text-xs text-center text-slate-400 font-mono">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 w-52">
              <div className="text-white font-bold mb-1">1. User license input</div>
              <span>FM-1A8D-9E2F-43B0</span>
            </div>
            <div className="text-violet-500 font-extrabold text-base">→</div>
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 w-52">
              <div className="text-white font-bold mb-1">2. POST /api/verify</div>
              <span>Sends Fingerprint</span>
            </div>
            <div className="text-violet-500 font-extrabold text-base">→</div>
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 w-52">
              <div className="text-white font-bold mb-1">3. RS256 JWT Signed</div>
              <span>Saved as Local Lease</span>
            </div>
            <div className="text-violet-500 font-extrabold text-base">→</div>
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 w-52">
              <div className="text-white font-bold mb-1">4. Secure Boot</div>
              <span>100% Offline Validation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Identity & UX */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900 bg-gradient-to-b from-transparent to-violet-950/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-violet-500/10 border border-violet-500/20 text-violet-400 p-2.5 rounded-xl">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Fluid Dual Color Themes</h4>
                <p className="text-slate-400 text-xs mt-1">Light Mode featuring violet accents (#5E35B1) with crisp charcoal surfaces, and Dark Mode featuring an active soft background (#121212) with elevated grey outlines. Changes render dynamically in-place.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-violet-500/10 border border-violet-500/20 text-violet-400 p-2.5 rounded-xl">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Dnd Helper & Path Sanitization</h4>
                <p className="text-slate-400 text-xs mt-1">Full integration of tkinterdnd2 drag-and-drop system. Cleans brackets, handles whitespace escapes, and converts path parameters smoothly for instant directory load inputs.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-violet-500/10 border border-violet-500/20 text-violet-400 p-2.5 rounded-xl">
                <RotateCw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Centralized Rotating Logs</h4>
                <p className="text-slate-400 text-xs mt-1">Keeps remote debugging clean with built-in logs rotation. Caps the filemaster.log file size at exactly 5MB, maintaining up to 3 backward versions cleanly.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <h2 className="text-xs text-violet-400 uppercase tracking-widest font-extrabold mb-3">Refined Visual Identity</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Modern native styling with real-time feedback
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              The client interfaces have been custom-engineered to look like a modern native OS environment, featuring deep-colored spreadsheets outputs conforming strictly to standard templates. The output charts are drawn directly onto Canvas elements keeping the binaries lightweight and fast.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl flex-1">
                <span className="block text-2xl font-black text-emerald-400">Green</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Found Sheet (#2E7D32)</span>
              </div>
              <div className="text-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl flex-1">
                <span className="block text-2xl font-black text-rose-500">Red</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Missing Sheet (#C62828)</span>
              </div>
              <div className="text-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl flex-1">
                <span className="block text-2xl font-black text-amber-500">Orange</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Extra Sheet (#E65100)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-xs text-violet-400 uppercase tracking-widest font-extrabold mb-3">Frequently Asked Questions</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Everything you need to know
          </h3>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> How does the offline licensing lease work?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              When you activate FileMaster using your license key online, our Next.js API server signs a JWT containing your hardware fingerprint using an RSA 2048-bit Private Key. This JWT is stored inside your user profile (~/.filemaster_lease). On boot, the client reads this file and verifies the signature using the built-in RSA Public Key fully offline. It then computes your local fingerprint and matches them.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> What happens if my computer hardware breaks or I need to migrate?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Since the license is tied securely to your hardware signature, a major motherboard or BIOS change will trigger a mismatch. If you need to migrate, our customer service administrators can easily target your license key in the Next.js Admin portal and hit &quot;Reset License&quot;. This clears the registered fingerprint and lets the key bind to your new machine on its next online launch.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> Can it handle folders over network volumes or infinite paths?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes, FileMaster uses standard Python pathlib constructs which resolve local drives, network mapped shares, and infinite directory depths. The recursive engine iterates through leaf items, skipping empty container nodes and extracting only file structures.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> Are my files uploaded to any servers?
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never. FileMaster is a local-first desktop application. No file data, column structures, filenames, or spreadsheets are ever uploaded or transmitted. The only online interaction is a short verification handshake containing your license key and your cryptographically computed hardware fingerprint hash.
            </p>
          </div>
        </div>
      </section>

      {/* Download CTA Callout */}
      <section id="download" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-violet-500/20 text-xs font-semibold text-violet-400">
            <Sparkles className="h-3 w-3" /> Seamless Data Auditing Awaits
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            Ready to secure your data reconciliation?
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Download FileMaster for Windows, macOS, or Linux today. Activate instantly with your purchased lifetime key and experience O(1) set-algebra comparison performance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all">
              Download FileMaster Desktop App
            </button>
            <Link 
              href="/auth/login" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-8 py-4 rounded-xl hover:bg-slate-900 transition-all"
            >
              Access Admin Console
            </Link>
          </div>

          <p className="text-[11px] text-slate-500">
            For hardware migration or support inquiries, contact licensing-support@filemaster.enterprise.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 px-6 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-violet-600 p-2 rounded-lg">
              <FileSpreadsheet className="h-4 w-4 text-white" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight">FileMaster</span>
          </div>

          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FileMaster. All rights reserved. Built for secure enterprise file reconciliation.
          </p>

          <div className="flex gap-6 text-xs text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
