import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { useNavigate, Link } from 'react-router-dom';
import {
  Truck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('akash.barik@bharatlogix.in');
  const [password, setPassword] = useState('FleetOps@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your work email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Ensure body and root scrolling is unlocked on mobile
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto lg:overflow-visible bg-slate-900 text-slate-100 flex flex-col lg:flex-row transition-colors duration-300">
      {/* FLOATING THEME TOGGLE BUTTON */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* LEFT 6 COLS: High-Impact Visual Showcase */}
      <div className="lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-visible lg:overflow-hidden lg:min-h-screen lg:sticky lg:top-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            {/* Brand Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-600/30">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black tracking-tight text-white">BharatLogix</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    AIS-140 LIVE
                  </span>
                </div>
                <p className="text-xs text-purple-300 font-mono">Pan-India Freight Command OS v2.4</p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                Mission-Critical Telematics for Indian Logistics.
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Real-time GPS tracking across 28 states, automated GST E-Way Bill watchdog, FASTag toll clearance, and MoRTH AIS-140 compliance.
              </p>
            </div>

            {/* Live Telemetry Corridor Preview Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-purple-300 font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    NH-48 // Delhi NCR → Mumbai Central Gateway
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                    ON SCHEDULE
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-400 h-full w-[78%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>Tata Prima 5530.S #101 • 68 km/h</span>
                  <span>78% (1,100 km done)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    Kolkata Dankuni → Chennai Corridor
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold font-mono">
                    FASTag Cleared
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[54%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>BharatBenz 2823R #102 • Cold Chain 4.2°C</span>
                  <span>54% (920 km done)</span>
                </div>
              </div>
            </div>

            {/* Quick Mobile Jump to Login Form */}
            <div className="lg:hidden pt-2 flex items-center justify-between">
              <a
                href="#login-form"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-200 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
              >
                <span>Scroll to Sign In Form</span>
                <ArrowDown className="w-3.5 h-3.5 text-purple-300 animate-bounce" />
              </a>
              <span className="text-[11px] text-slate-400 font-mono">Pan-India OS</span>
            </div>
          </div>

          {/* Bottom Govt Regulatory Strip */}
          <div className="relative z-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              MoRTH AIS-140 CERTIFIED
            </span>
            <span className="text-emerald-400 font-bold">● 4/4 GOVT GATEWAYS ACTIVE</span>
          </div>
        </div>

        {/* RIGHT 6 COLS: Rich Studio Auth Form with Signature Image 4 Design */}
        <div id="login-form" className="w-full lg:w-1/2 bg-slate-50 dark:bg-slate-950 px-4 py-8 sm:px-10 lg:px-14 lg:overflow-y-auto flex flex-col justify-start items-center relative transition-colors duration-300 scroll-mt-4">
          <div className="w-full max-w-md group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-7 sm:p-8 space-y-6 mb-6">
            {/* Top Radiant Highlight Bar — clipped with rounded-t-3xl on its own div */}
            <div className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-95 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Form Header */}
            <div className="flex items-start justify-between gap-4 pt-1">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    National Dispatch Gateway
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Sign In to Dashboard
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter dispatcher credentials to access national telematics.
                </p>
              </div>
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@bharatlogix.in"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Security Password
                  </label>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-semibold cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="font-medium text-xs">Keep authenticated for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Authenticating Live Dispatcher...' : 'Sign In to Command Center'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Security & Credentials Strip */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>TLS 1.3 • SOC-2 Type II</span>
              </span>
              <Link to="/signup" className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1">
                Onboard New Carrier <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
