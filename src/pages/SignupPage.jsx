import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/layout/ThemeToggle';
import { useNavigate, Link } from 'react-router-dom';
import {
  Truck,
  Mail,
  Lock,
  User,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Radio
} from 'lucide-react';

export const SignupPage = () => {
  const { signup } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Operations Lead',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFillSample = () => {
    setFormData({
      name: 'Rohan Deshmukh',
      email: 'rohan.d@maharashtrafreight.in',
      company: 'Maharashtra Interstate Logistics Ltd.',
      role: 'Operations Lead',
      password: 'FleetOps@2026',
      confirmPassword: 'FleetOps@2026',
      agreeTerms: true
    });
    setError('');
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) return 'Please enter a valid work email address.';
    if (!formData.company.trim()) return 'Please enter your fleet organization name.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters.';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
    if (!formData.agreeTerms) return 'Please accept the Platform Security Agreement.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed.');
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

      {/* LEFT 5 COLS: High-Impact Visual Showcase */}
      <div className="lg:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-visible lg:overflow-hidden lg:min-h-screen lg:sticky lg:top-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-600/30">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black tracking-tight text-white">BharatLogix</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ENTERPRISE
                  </span>
                </div>
                <p className="text-xs text-purple-300 font-mono">Carrier & Fleet Onboarding Portal</p>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
                Join 1,200+ Commercial Fleets Across India
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your fleet to unified telematics, automatic FASTag toll clearing, and GST E-Way Bill lifecycle automation.
              </p>
            </div>

            {/* Compliance & Integration Badges */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-purple-500/30 transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Pre-Integrated Vahan 4.0 & Sarathi</p>
                  <p className="text-[11px] text-slate-400">Automated RC & DL verification</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-purple-500/30 transition-all">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">AIS-140 Panic & Telematics Compliance</p>
                  <p className="text-[11px] text-slate-400">Certified for national transport tenders</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-md hover:border-purple-500/30 transition-all">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">GST E-Way Bill Rule 138 Watchdog</p>
                  <p className="text-[11px] text-slate-400">Real-time expiry warning before toll checkpoints</p>
                </div>
              </div>
            </div>

            {/* Quick Mobile Jump to Registration Form */}
            <div className="lg:hidden pt-2 flex items-center justify-between">
              <a
                href="#signup-form"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-200 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
              >
                <span>Scroll to Registration Form</span>
                <ArrowDown className="w-3.5 h-3.5 text-purple-300 animate-bounce" />
              </a>
              <span className="text-[11px] text-slate-400 font-mono">Pan-India OS</span>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>MoRTH & ULIP COMPLIANT PLATFORM</span>
            <span className="text-emerald-400">● 99.98% SLA</span>
          </div>
        </div>

        {/* RIGHT 7 COLS: Rich Studio Auth Form with Signature Image 4 Design */}
        <div id="signup-form" className="w-full lg:w-7/12 bg-slate-50 dark:bg-slate-950 px-4 py-8 sm:px-10 lg:px-14 lg:overflow-y-auto flex flex-col justify-start items-center relative transition-colors duration-300 scroll-mt-4">
          <div className="w-full max-w-lg group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-7 sm:p-9 space-y-6 mb-6">
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
                    Enterprise Carrier Registry
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Create Carrier Account
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Onboard your commercial fleet to the unified national logistics network.
                </p>
              </div>
              <div className="p-2.5 rounded-2xl border bg-purple-100 text-purple-700 border-purple-200/90 shadow-sm dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
            </div>



            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      placeholder="Rohan Deshmukh"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      placeholder="rohan.d@freight.in"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Carrier / Organization Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => handleChange('company', e.target.value)}
                    placeholder="Maharashtra Interstate Logistics Ltd."
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Operations Role Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Operational Authority Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Operations Lead', 'Dispatch Director', 'Safety Officer', 'Regional Manager'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleChange('role', r)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left truncate ${
                        formData.role === r
                          ? 'bg-purple-100 border-purple-400 text-purple-800 dark:bg-purple-600/20 dark:border-purple-500 dark:text-purple-300 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-purple-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e => handleChange('password', e.target.value)}
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-purple-500 dark:text-purple-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={e => handleChange('confirmPassword', e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={e => handleChange('agreeTerms', e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-[11px] leading-tight text-slate-600 dark:text-slate-400">
                    I agree to the National Logistics Security Policy & AIS-140 Data Handling Terms.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:opacity-95 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? 'Creating Carrier Profile...' : 'Complete Carrier Registration'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Security & Credentials Strip */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>TLS 1.3 • SOC-2 Type II</span>
              </span>
              <Link to="/login" className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1">
                Sign In to Your Account <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
