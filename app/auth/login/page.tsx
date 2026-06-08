'use client';
 
import { useActionState, Suspense } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { FileSpreadsheet, Mail, Lock, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

function LoginFormContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <div className="space-y-1.5">
        <label
          className="text-xs font-bold text-slate-300 uppercase tracking-wider block"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <Mail className="h-4 w-4" />
          </span>
          <input
            className="block w-full rounded-xl bg-slate-950 border border-slate-800 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all outline-none"
            id="email"
            type="email"
            name="email"
            placeholder="admin@filemaster.enterprise"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          className="text-xs font-bold text-slate-300 uppercase tracking-wider block"
          htmlFor="password"
        >
          Security Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
            <Lock className="h-4 w-4" />
          </span>
          <input
            className="block w-full rounded-xl bg-slate-950 border border-slate-800 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all outline-none"
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
          />
        </div>
      </div>

      <button 
        type="submit"
        disabled={isPending}
        className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          'Sign In to Admin Console'
        )}
      </button>

      {errorMessage && (
        <div className="mt-4 flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-xs text-rose-400">
          <ShieldAlert className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="leading-normal">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
 
export default function LoginForm() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans relative selection:bg-violet-500 selection:text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Landing Page
        </Link>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent rounded-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-violet-500/20 mb-4">
              <FileSpreadsheet className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Admin Portal Login
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 max-w-[280px]">
              Secure authentication for FileMaster administrators and support operators.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="h-6 w-6 text-violet-500 animate-spin" />
              <p className="text-xs text-slate-500 font-mono">Loading authentication parameters...</p>
            </div>
          }>
            <LoginFormContent />
          </Suspense>
        </div>

        <div className="text-center">
          <p className="text-[11px] text-slate-500">
            Authorized Personnel Only. Connections are audited under corporate logging policies.
          </p>
        </div>
      </div>
    </div>
  );
}
