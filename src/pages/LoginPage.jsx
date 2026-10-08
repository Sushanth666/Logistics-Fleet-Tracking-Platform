import React, { useState } from 'react';
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
  ShieldCheck,
  Sparkles,
  Zap,
  Radio
} from 'lucide-react';

const DEMO_ROLES = [
  {
    name: "Akash Barik",
    email: "akash.barik@bharatlogix.in",
    role: "Fleet Operations Lead",
    hub: "Mumbai Gateway Hub",
    password: "FleetOps@2026"
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@bharatlogix.in",
    role: "National Dispatch Director",
    hub: "Delhi NCR Command",
    password: "FleetOps@2026"
  }
];

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
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  const handleSelectRole = (role, index) => {
    setActiveRoleIndex(index);
    setEmail(role.email);
    setPassword(role.password);
    setError('');
  };

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

  return (
    <div className="relative min-h-screen overflow-y-auto bg-slate-900 transition-colors duration-300">
      {/* FLOATING THEME TOGGLE BUTTON */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* CINEMATIC SPLIT SCREEN */}
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex lg:flex-row transition-colors duration-300">
        {/* LEFT 6 COLS: High-Impact Visual Showcase */}
        <div className="lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden lg:min-h-screen">
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
        <div className="lg:w-1/2 bg-slate-50 dark:bg-slate-950 px-6 py-10 sm:px-10 lg:px-14 overflow-y-auto flex flex-col justify-start items-center relative transition-colors duration-300">
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

            {/* 1-Click Demo Profiles Card with Image 4 styling */}
            <div className="relative overflow-hidden p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  1-Click Demo Dispatcher:
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  Instant Fill
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ROLES.map((r, idx) => {
                  const isSelected = activeRoleIndex === idx;
                  const initials = r.name.split(' ').map(n => n[0]).join('');
                  return (
                    <button
                      key={r.email}
                      type="button"
                      onClick={() => handleSelectRole(r, idx)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold border-transparent shadow-md shadow-purple-600/30'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-600/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'
                      }`}>
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs truncate">{r.name}</p>
                        <p className={`text-[10px] truncate ${isSelected ? 'text-purple-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {r.role.split(' ')[0]}
                        </p>
                      </div>
                    </button>
                  );
                })}
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
                Create Account <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
