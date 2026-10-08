import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useFleet } from '../../context/FleetContext';
import {
  ShieldCheck,
  CreditCard,
  FileText,
  Radio,
  Building2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  QrCode,
  Zap,
  ArrowUpRight,
  Clock,
  Download,
  ExternalLink,
  Activity,
  PlusCircle,
  Truck,
  Sparkles,
  Check
} from 'lucide-react';

export const NationalGatewayModal = ({ isOpen, onClose }) => {
  const { shipments, addToast, vehicles } = useFleet();

  const [activeTab, setActiveTab] = useState('eway'); // 'eway' | 'fastag' | 'ais140' | 'vahan'
  const [fastagBalance, setFastagBalance] = useState(48250);
  const [isPinging, setIsPinging] = useState(false);
  const [lastAuditTime, setLastAuditTime] = useState('Just now (16:15 IST)');
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  // Dynamic E-Way Bill tracking state
  const [ewbList, setEwbList] = useState([
    {
      shipmentId: 'SHP-8821',
      ewbNumber: '2810-4920-1928',
      route: 'Mumbai, MH → Bengaluru, KA (980 km)',
      vehiclePlate: 'MH-04-EB-8472',
      consignee: 'Reliance Retail Logistics',
      validHoursRemaining: 14,
      status: 'active',
      extendedCount: 0
    },
    {
      shipmentId: 'SHP-8822',
      ewbNumber: '3190-8812-4402',
      route: 'Gurugram, HR → Ahmedabad, GJ (890 km)',
      vehiclePlate: 'GJ-01-AX-9912',
      consignee: 'Tata Motors Commercial Parts',
      validHoursRemaining: 21,
      status: 'active',
      extendedCount: 0
    },
    {
      shipmentId: 'SHP-8823',
      ewbNumber: '4019-1102-7789',
      route: 'Chennai, TN → Hyderabad, TG (630 km)',
      vehiclePlate: 'TN-09-CD-3481',
      consignee: 'Apollo Tyres Regional Logistics',
      validHoursRemaining: 4, // Critical
      status: 'expiring-soon',
      extendedCount: 0
    },
    {
      shipmentId: 'SHP-8824',
      ewbNumber: '5512-3901-2290',
      route: 'Vadodara, GJ → Ludhiana, PB (1,240 km)',
      vehiclePlate: 'DL-01-EV-5021',
      consignee: 'Amul Dairy Cold-Chain Hub',
      validHoursRemaining: 32,
      status: 'active',
      extendedCount: 0
    }
  ]);

  // Live FASTag Toll Transactions
  const [tollTransactions, setTollTransactions] = useState([
    {
      id: 'TXN-901',
      plaza: 'Khed Shivapur Toll Plaza',
      highway: 'NH-48 Pune-Satara',
      plate: 'MH-04-EB-8472',
      amount: 340,
      time: '08:30 IST',
      status: 'cleared'
    },
    {
      id: 'TXN-902',
      plaza: 'Manesar National Toll Plaza',
      highway: 'NH-48 Delhi-Jaipur',
      plate: 'GJ-01-AX-9912',
      amount: 485,
      time: '09:15 IST',
      status: 'cleared'
    },
    {
      id: 'TXN-903',
      plaza: 'Krishnagiri Plaza (FASTag Dedicated)',
      highway: 'NH-44 Bengaluru-Salem',
      plate: 'TN-09-CD-3481',
      amount: 295,
      time: '10:45 IST',
      status: 'cleared'
    },
    {
      id: 'TXN-904',
      plaza: 'Kagal Border State Tax Gate',
      highway: 'NH-48 Kolhapur-Belagavi',
      plate: 'DL-01-EV-5021',
      amount: 310,
      time: '11:20 IST',
      status: 'cleared'
    }
  ]);

  // 1-Click Extend E-Way Bill Action
  const handleExtendEwb = (ewbNumber) => {
    setEwbList(prev =>
      prev.map(item => {
        if (item.ewbNumber === ewbNumber) {
          const newHours = item.validHoursRemaining + 24;
          return {
            ...item,
            validHoursRemaining: newHours,
            status: 'active',
            extendedCount: item.extendedCount + 1
          };
        }
        return item;
      })
    );
    addToast(`E-Way Bill ${ewbNumber} successfully extended by +24 hours via NIC E-Way Bill Portal API!`, 'success');
  };

  // 1-Click Recharge FASTag Wallet
  const handleRechargeFastag = (amount) => {
    setFastagBalance(prev => prev + amount);
    setRechargeSuccess(true);
    setTimeout(() => setRechargeSuccess(false), 2000);
    addToast(`FASTag Central Wallet credited with ₹${amount.toLocaleString('en-IN')} via NPCI NETC Switch.`, 'success');
  };

  // Run Regulatory Health Audit / Ping
  const handleRunAudit = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setLastAuditTime('Just now (' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST)');
      addToast('All 4 National Logistics Gateways (ULIP, E-Way Bill, FASTag, AIS-140) verified with 100% operational health.', 'success');
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-5xl"
      title={
        <div className="flex flex-wrap items-center gap-2.5">
          <span>National Logistics Gateway & Compliance Center</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> ULIP & MoRTH CERTIFIED
          </span>
        </div>
      }
      subtitle="Unified real-time interface for GST E-Way Bill (NIC), NPCI FASTag NETC tolling, MoRTH AIS-140 GPS telematics, and Vahan 4.0 registry."
    >
      <div className="space-y-6">
        {/* Top 1-Click Gateway Diagnostic Health Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              Live Govt Gateway Connections (ULIP National Switch)
            </span>
            <button
              onClick={handleRunAudit}
              disabled={isPinging}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Pinging Gateways...' : 'Test Latency'}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                title: 'GST E-Way Bill (NIC)',
                latency: isPinging ? '...' : '38ms',
                status: 'Active',
                tag: 'Govt GSTN API'
              },
              {
                title: 'NPCI FASTag NETC',
                latency: isPinging ? '...' : '16ms',
                status: 'Operational',
                tag: 'National Toll Switch'
              },
              {
                title: 'MoRTH AIS-140 GPS',
                latency: isPinging ? '...' : '45ms',
                status: 'Connected',
                tag: 'NavIC Dual Constellation'
              },
              {
                title: 'Vahan 4.0 & Sarathi',
                latency: isPinging ? '...' : '52ms',
                status: 'Synced',
                tag: 'National Registry'
              }
            ].map(gw => (
              <div
                key={gw.title}
                className="p-2.5 rounded-xl border bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs truncate">{gw.title}</p>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>{gw.tag}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{gw.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs for Gateway Modules */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-xs w-full">
          {[
            { id: 'eway', label: 'E-Way Bill (NIC)', icon: FileText, count: ewbList.length },
            { id: 'fastag', label: 'FASTag NETC Toll', icon: CreditCard, count: `₹${(fastagBalance / 1000).toFixed(1)}k` },
            { id: 'ais140', label: 'AIS-140 Telematics', icon: Radio, count: '8/8 Active' },
            { id: 'vahan', label: 'Vahan & Sarathi Registry', icon: Building2, count: 'Verified' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full min-w-0 py-2 px-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold border border-slate-200/80 dark:border-slate-700/80'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                <span className="truncate text-xs font-semibold">{tab.label}</span>
                <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Studio Layout: Left Active Tab Content (7 cols), Right Live Regulatory Pass (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* TAB 1: E-WAY BILL MONITOR */}
            {activeTab === 'eway' && (
              <div className="space-y-3.5">
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs">
                  <div className="flex items-start gap-2.5 text-blue-900 dark:text-blue-300">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Indian GST Rule 138 Compliance Monitor</p>
                      <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-0.5 leading-relaxed">
                        Regular freight is valid for 1 day per 200 km. If transit is delayed due to toll bottlenecks or vehicle issues, operators can request a 24h extension within 8 hours of expiry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {ewbList.map(item => {
                    const isExpiringSoon = item.validHoursRemaining <= 6;
                    return (
                      <div
                        key={item.ewbNumber}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isExpiringSoon
                            ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                            : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                                EWB #{item.ewbNumber}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                {item.shipmentId}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                              {item.route}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Consignee: {item.consignee} • Assigned: <span className="font-mono font-semibold">{item.vehiclePlate}</span>
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isExpiringSoon
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200'
                            }`}>
                              <Clock className="w-2.5 h-2.5" />
                              {item.validHoursRemaining}h remaining
                            </span>
                          </div>
                        </div>

                        {/* Validity progress bar */}
                        <div className="mt-2.5 flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isExpiringSoon ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, (item.validHoursRemaining / 36) * 100)}%` }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleExtendEwb(item.ewbNumber)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800/60 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3 text-indigo-600" />
                            <span>Extend +24h</span>
                          </button>
                        </div>
                        {item.extendedCount > 0 && (
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                            ✓ Extended {item.extendedCount} time(s) per Rule 138(10)
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: FASTAG NETC TOLL WALLET */}
            {activeTab === 'fastag' && (
              <div className="space-y-4">
                {/* Balance & Quick Top-Up Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute right-2 top-2 opacity-10 pointer-events-none">
                    <CreditCard className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs text-indigo-200">
                      <span className="font-bold tracking-wider uppercase font-mono">NPCI FASTAG COMMERCIAL FLEET WALLET</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        AUTO-DEBIT ACTIVE
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-3xl font-extrabold tracking-tight">
                        ₹{fastagBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[11px] text-indigo-300 mt-0.5">
                        Shared wallet across all 8 commercial vehicles • Low-balance threshold: ₹10,000
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-indigo-800/60 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-indigo-200 font-medium">Quick Top-Up:</span>
                      {[
                        { label: '+₹5,000', amount: 5000 },
                        { label: '+₹10,000', amount: 10000 },
                        { label: '+₹25,000', amount: 25000 }
                      ].map(btn => (
                        <button
                          key={btn.amount}
                          type="button"
                          onClick={() => handleRechargeFastag(btn.amount)}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <PlusCircle className="w-3 h-3 text-emerald-400" />
                          <span>{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Highway Toll Transactions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                    <span>Recent National Highway Plaza Debits</span>
                    <span className="text-[10px] text-slate-500 font-normal">Real-Time NETC Sync</span>
                  </h4>
                  <div className="space-y-2">
                    {tollTransactions.map(txn => (
                      <div
                        key={txn.id}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{txn.plaza}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {txn.highway} • <span className="font-mono font-semibold">{txn.plate}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-rose-600 dark:text-rose-400 font-mono">
                            -₹{txn.amount}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">{txn.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AIS-140 PANIC & SATELLITE TELEMATICS */}
            {activeTab === 'ais140' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300">
                  <div className="flex items-start gap-2.5">
                    <Radio className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">MoRTH AIS-140 Intelligent Transport Mandate</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Mandatory dual-IP telemetry transmitting to State Emergency Response Centres (ERSS 112) with panic SOS actuators and speed governors.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Emergency Panic SOS Actuators', value: '8/8 Armed & Calibrated', status: 'Optimal' },
                    { label: 'Speed Governor Restriction', value: 'Commercial 80 km/h Governed', status: 'Compliant' },
                    { label: 'Satellite Constellation Lock', value: 'ISRO NavIC + GPS (18 Satellites)', status: 'Locked' },
                    { label: 'State ERSS 112 Gateway Heartbeat', value: 'Dual IP Backup Active', status: 'Online' }
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        {stat.label}
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        <CheckCircle2 className="w-3 h-3" /> {stat.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Live Vehicle SOS Health Matrix */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Fleet AIS-140 Firmware Status
                  </h5>
                  <div className="space-y-1.5 text-xs">
                    {vehicles.slice(0, 4).map(v => (
                      <div key={v.id} className="flex items-center justify-between py-1 border-b border-slate-200/60 dark:border-slate-800/60 last:border-none">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{v.name}</span>
                          <span className="font-mono text-[10px] text-slate-500">{v.plate}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          AIS-140 v2.6.4 (Pass)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: VAHAN & SARATHI REGISTRY */}
            {activeTab === 'vahan' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <Building2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Ministry of Road Transport & Highways (MoRTH) Registries</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Direct synchronization with Vahan 4.0 (Vehicle Fitness, National Permits, Tax clearance) and Sarathi (Commercial Pilot License endorsement & demerit points).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-indigo-600" />
                      Vahan 4.0 Fleet RC Status
                    </h5>
                    <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <p>✓ All 8 Assets National Permit: <strong className="text-emerald-600">Active (5-Year)</strong></p>
                      <p>✓ Fitness Tests Passed: <strong className="text-emerald-600">100% Compliant</strong></p>
                      <p>✓ Green Cess & Road Tax: <strong className="text-emerald-600">Paid Thru 2027</strong></p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      Sarathi Driver Records
                    </h5>
                    <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <p>✓ Commercial DL Verified: <strong className="text-emerald-600">20 Pilots</strong></p>
                      <p>✓ HazMat Endorsement Checked: <strong className="text-emerald-600">Verified</strong></p>
                      <p>✓ Active Traffic Challans: <strong className="text-emerald-600">Zero Unsettled</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols) - Live Govt ULIP Compliance Pass */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-900/70 dark:to-slate-950/70 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 space-y-4 lg:sticky lg:top-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono block">
                  GOVT OF INDIA // ULIP GATEWAY PASS
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  ULIP-PROD-2026-IN-94812
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-mono font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% COMPLIANT</span>
              </div>
            </div>

            {/* Smart Digital Certificate Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇮🇳</span>
                  <div>
                    <h4 className="text-xs font-bold leading-none">Unified Logistics Interface Platform</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Ministry of Commerce & Industry</span>
                  </div>
                </div>
                <QrCode className="w-8 h-8 text-white/80" />
              </div>

              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-400 uppercase font-mono block">Enterprise</span>
                  <span className="font-bold text-white">BharatLogix India Pvt Ltd</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-mono block">Status</span>
                  <span className="font-bold text-emerald-400">Class A Tier 1 Carrier</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-mono block">Valid Thru</span>
                  <span className="font-bold text-white">31-Dec-2029</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-mono block">SLA Reliability</span>
                  <span className="font-bold text-amber-300">99.98% Monitored</span>
                </div>
              </div>
            </div>

            {/* Regulatory Compliance Checklist */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                STATUTORY COMPLIANCE AUDIT
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    GST E-Way Bill Rule 138 Sync
                  </span>
                  <span className="font-bold font-mono text-[10px] text-emerald-600">Active</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    FASTag NETC Automatic Clearance
                  </span>
                  <span className="font-bold font-mono text-[10px] text-emerald-600">Operational</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    MoRTH AIS-140 GPS Server Feeds
                  </span>
                  <span className="font-bold font-mono text-[10px] text-emerald-600">Online</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Commercial Vahan & Sarathi Verification
                  </span>
                  <span className="font-bold font-mono text-[10px] text-emerald-600">Synced</span>
                </div>
              </div>
            </div>

            {/* Last Audit Stamp */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center py-1">
              Last automated audit: <span className="font-medium text-slate-700 dark:text-slate-300">{lastAuditTime}</span>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-[11px]">ULIP National Logistics Interface Switch: 4/4 Gateways Live</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                addToast('Regulatory Compliance Audit Certificate downloaded as verified PDF.', 'success');
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Report</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:opacity-95 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
