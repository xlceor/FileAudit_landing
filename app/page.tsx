'use client';
import { useTranslation } from '@/lib/TranslationProvider';
import LandingPage from './marketing/page';
import { 
  FileSpreadsheet, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Workflow, 
  FileCode, 
  Cpu, 
  RefreshCw, 
  Database, 
  Code,
  HardDrive,
  XCircle,
  RotateCw,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { t, setLocale, locale } = useTranslation();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-violet-500 selection:text-white font-sans overflow-x-hidden">
      <LandingPage />
    </div>
  );
}
