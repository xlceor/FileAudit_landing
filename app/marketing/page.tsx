'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Sparkles, 
  FileCode, 
  Database,
  ArrowRight,
  Fingerprint,
  RotateCw,
  HelpCircle,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Check,
  Building,
  Clock,
  ShieldAlert,
  ClipboardCheck,
  CheckSquare,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { translations } from './translations';

export default function LandingPage() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      setLang('es');
    }
  }, []);

  const t = translations[lang as keyof typeof translations] || translations.en;

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

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
            <a href="#about" className="hover:text-violet-400 transition-colors">{t.nav.about}</a>
            <a href="#problems" className="hover:text-violet-400 transition-colors">{t.nav.problems}</a>
            <a href="#how-it-works" className="hover:text-violet-400 transition-colors">{t.nav.howItWorks}</a>
            <a href="#benefits" className="hover:text-violet-400 transition-colors">{t.nav.benefits}</a>
            <a href="#licensing" className="hover:text-violet-400 transition-colors">{t.nav.licensing}</a>
            <a href="#faq" className="hover:text-violet-400 transition-colors">{t.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition-all"
              title="Change Language / Cambiar Idioma"
            >
              <Globe className="h-3.5 w-3.5 text-violet-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <Link 
              href="/auth/login" 
              className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-800/80 transition-all shadow-inner"
            >
              {t.nav.adminPortal}
            </Link>
            <a 
              href="#download" 
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all"
            >
              {t.nav.getDesktopApp} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-8 shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" /> {t.hero.tagline}
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl leading-[1.1] mb-6">
          {t.hero.title1} {' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400">
            {t.hero.titleHighlight}
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-xl max-w-3xl leading-relaxed mb-10">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#download" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 transition-all"
          >
            {t.hero.downloadButton} <ArrowRight className="h-5 w-5" />
          </a>
          <a 
            href="#problems" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-8 py-4 rounded-2xl hover:bg-slate-800/80 transition-all"
          >
            {t.hero.exploreButton}
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
            <div className="text-xs font-mono text-slate-400 bg-slate-950 px-4 py-1 rounded-md border border-slate-800/50">
              {t.hero.dashboard.operation}
            </div>
            <div className="w-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">{t.hero.stats.expected}</div>
              <div className="text-2xl font-black text-violet-400">125,480</div>
              <div className="text-[10px] text-slate-500 mt-1">{t.hero.stats.databaseLoad}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">{t.hero.stats.found}</div>
              <div className="text-2xl font-black text-emerald-400">121,043</div>
              <div className="text-[10px] text-emerald-500/80 mt-1">{t.hero.stats.completionArc}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">{t.hero.stats.missing}</div>
              <div className="text-2xl font-black text-rose-500">4,127</div>
              <div className="text-[10px] text-rose-500/80 mt-1">{t.hero.stats.expectedNotOnDisk}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">{t.hero.stats.extra}</div>
              <div className="text-2xl font-black text-amber-500">310</div>
              <div className="text-[10px] text-amber-500/80 mt-1">{t.hero.stats.onDiskUnrecorded}</div>
            </div>
          </div>

          {/* Canvas visualization simulation */}
          <div className="mt-4 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 justify-around">
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                  <circle cx="56" cy="56" r="48" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="301.6" strokeDashoffset="10.8" />
                </svg>
                <div className="text-center">
                  <div className="text-lg font-black text-white">96.4%</div>
                  <div className="text-[9px] text-slate-400 uppercase font-bold">{t.hero.stats.auditScore}</div>
                </div>
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-sm font-bold text-slate-200">{t.hero.stats.reconciliationSuccessful}</h4>
                <p className="text-xs text-slate-400 max-w-xs">{t.hero.stats.reconciliationDescription}</p>
              </div>
            </div>

            <div className="flex gap-2 self-stretch items-end h-24 pt-4 px-4 border-t sm:border-t-0 sm:border-l border-slate-800 w-full max-w-sm">
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: '95%' }} />
                <span className="text-[9px] text-slate-500 font-bold">{t.hero.stats.found}</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-rose-500 rounded-t-sm" style={{ height: '24%' }} />
                <span className="text-[9px] text-slate-500 font-bold">{t.hero.stats.missing}</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full bg-amber-500 rounded-t-sm" style={{ height: '8%' }} />
                <span className="text-[9px] text-slate-500 font-bold">{t.hero.stats.extra}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Real-world Validation Section */}
      <section id="about" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-900 relative">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-12">
          <span className="text-xs text-violet-400 uppercase tracking-widest font-extrabold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">{t.trust.tag}</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            {t.trust.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            {t.trust.description}
          </p>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center">
            <div className="bg-violet-500/10 text-violet-400 p-3 rounded-xl w-fit mx-auto mb-4 border border-violet-500/20">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{t.trust.metric1.value}</div>
            <div className="text-xs text-slate-400 mt-1">{t.trust.metric1.label}</div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center">
            <div className="bg-violet-500/10 text-violet-400 p-3 rounded-xl w-fit mx-auto mb-4 border border-violet-500/20">
              <Building className="h-6 w-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{t.trust.metric2.value}</div>
            <div className="text-xs text-slate-400 mt-1">{t.trust.metric2.label}</div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center">
            <div className="bg-violet-500/10 text-violet-400 p-3 rounded-xl w-fit mx-auto mb-4 border border-violet-500/20">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{t.trust.metric3.value}</div>
            <div className="text-xs text-slate-400 mt-1">{t.trust.metric3.label}</div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center">
            <div className="bg-violet-500/10 text-violet-400 p-3 rounded-xl w-fit mx-auto mb-4 border border-violet-500/20">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{t.trust.metric4.value}</div>
            <div className="text-xs text-slate-400 mt-1">{t.trust.metric4.label}</div>
          </div>
        </div>

        {/* Origins Story card */}
        <div className="bg-gradient-to-r from-violet-950/20 to-slate-900/40 border border-violet-500/20 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-4 sm:p-6 rounded-2xl shadow-xl shadow-violet-500/10 flex-shrink-0">
            <Building className="h-10 sm:h-12 sm:w-12 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {t.trust.storyTitle}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.trust.storyText}
            </p>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section id="problems" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900 relative">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center mb-16">
          <span className="text-xs text-violet-400 uppercase tracking-widest font-extrabold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">{t.problems.tag}</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            {t.problems.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            {t.problems.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl w-fit mb-6 border border-violet-500/20">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">{t.problems.missing.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.problems.missing.description}
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl w-fit mb-6 border border-violet-500/20">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">{t.problems.unexpected.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.problems.unexpected.description}
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl w-fit mb-6 border border-violet-500/20">
              <RotateCw className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">{t.problems.migration.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.problems.migration.description}
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl w-fit mb-6 border border-violet-500/20">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">{t.problems.inventory.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.problems.inventory.description}
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl w-fit mb-6 border border-violet-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">{t.problems.compliance.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.problems.compliance.description}
            </p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:border-violet-500/30 transition-all group relative">
            <div className="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl w-fit mb-6 border border-violet-500/20">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-violet-400 transition-colors">{t.problems.integrity.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.problems.integrity.description}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <span className="text-xs text-violet-400 uppercase tracking-widest font-extrabold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">{t.howItWorks.tag}</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-slate-900/20 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="text-xs text-violet-400 font-mono uppercase mb-4 tracking-wider">Step 1</div>
            <h3 className="text-lg font-bold text-white mb-2">{t.howItWorks.step1.title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t.howItWorks.step1.description}</p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/20 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="text-xs text-violet-400 font-mono uppercase mb-4 tracking-wider">Step 2</div>
            <h3 className="text-lg font-bold text-white mb-2">{t.howItWorks.step2.title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t.howItWorks.step2.description}</p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/20 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="text-xs text-violet-400 font-mono uppercase mb-4 tracking-wider">Step 3</div>
            <h3 className="text-lg font-bold text-white mb-2">{t.howItWorks.step3.title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t.howItWorks.step3.description}</p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/20 border border-slate-800/80 p-6 rounded-2xl relative">
            <div className="text-xs text-violet-400 font-mono uppercase mb-4 tracking-wider">Step 4</div>
            <h3 className="text-lg font-bold text-white mb-2">{t.howItWorks.step4.title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t.howItWorks.step4.description}</p>
          </div>
        </div>
      </section>

      {/* Benefits Over Features Section */}
      <section id="benefits" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900 relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs text-violet-400 uppercase tracking-widest font-extrabold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">{t.benefits.tag}</span>
            <h3 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight mb-6">
              {t.benefits.title}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex gap-4 items-start">
              <div className="bg-violet-500/10 text-violet-400 p-2.5 rounded-xl h-fit border border-violet-500/20">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-lg">{t.benefits.benefit1.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{t.benefits.benefit1.description}</p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex gap-4 items-start">
              <div className="bg-violet-500/10 text-violet-400 p-2.5 rounded-xl h-fit border border-violet-500/20">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-lg">{t.benefits.benefit2.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{t.benefits.benefit2.description}</p>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex gap-4 items-start">
              <div className="bg-violet-500/10 text-violet-400 p-2.5 rounded-xl h-fit border border-violet-500/20">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-lg">{t.benefits.benefit3.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{t.benefits.benefit3.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing Section (Reduced Prominence, Moved Near Bottom) */}
      <section id="licensing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <span className="text-xs text-violet-400 uppercase tracking-widest font-extrabold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">{t.licensing.tag}</span>
          <h3 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            {t.licensing.title}
          </h3>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mt-3">
            {t.licensing.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-6 border border-violet-500/20">
                <Check className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">{t.licensing.oneTime.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.licensing.oneTime.description}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-6 border border-violet-500/20">
                <Fingerprint className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">{t.licensing.offline.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.licensing.offline.description}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-violet-400 bg-violet-500/10 p-3 rounded-xl w-fit mb-6 border border-violet-500/20">
                <RotateCw className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-3">{t.licensing.migration.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.licensing.migration.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <span className="text-xs text-violet-400 uppercase tracking-widest font-extrabold bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">{t.faq.tag}</span>
          <h3 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            {t.faq.title}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> {t.faq.q1.q}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.faq.q1.a}
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> {t.faq.q2.q}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.faq.q2.a}
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> {t.faq.q3.q}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.faq.q3.a}
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-violet-400" /> {t.faq.q4.q}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.faq.q4.a}
            </p>
          </div>
        </div>
      </section>

      {/* Download CTA Callout */}
      <section id="download" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-violet-500/20 text-xs font-semibold text-violet-400">
            <Sparkles className="h-3 w-3" /> {t.download.tagline}
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            {t.download.title}
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.download.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all" href='https://drive.google.com/uc?export=download&id=1LWK6aABBf2_ppm31viee4q8AonN6pIxg' target='_blank' rel="noopener noreferrer">
              {t.download.button}
            </a>
            <Link 
              href="/auth/login" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-8 py-4 rounded-xl hover:bg-slate-900 transition-all"
            >
              {t.download.adminConsole}
            </Link>
          </div>

          <p className="text-[11px] text-slate-500">
            {t.download.support}
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
            &copy; {new Date().getFullYear()} FileMaster. {t.footer.copyright}
          </p>

          <div className="flex gap-6 text-xs text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-300 transition-colors">{t.footer.privacyPolicy}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{t.footer.termsOfService}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{t.footer.documentation}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
