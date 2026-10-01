import React, { useState } from 'react';
import {
  Car, Server, UploadCloud, FileText, CheckCircle2, AlertTriangle,
  HardDrive, Cpu, Globe, Download, Printer,
} from 'lucide-react';
import { TechIcon, type TechKey } from './TechIcon';

type DefectType = 'original' | 'minor_scratch' | 'dent' | 'repainted' | 'replaced';

const initialZones = [
  { id: 'bonnet', name: 'Hood / Bonnet' },
  { id: 'roof', name: 'Roof Top' },
  { id: 'front-bumper', name: 'Front Bumper' },
  { id: 'rear-bumper', name: 'Rear Bumper' },
  { id: 'trunk', name: 'Trunk / Boot' },
  { id: 'front-left-door', name: 'Front Right Door (Driver)' },
  { id: 'rear-left-door', name: 'Rear Right Door' },
  { id: 'front-right-door', name: 'Front Left Door' },
  { id: 'rear-right-door', name: 'Rear Left Door' },
  { id: 'windshield', name: 'Front Windshield' },
];

const initialDefects: Record<string, { type: DefectType; notes: string; photoUploaded: boolean }> = {
  bonnet: { type: 'minor_scratch', notes: 'Small hairline scratch, original paint thickness 110µm', photoUploaded: true },
  roof: { type: 'original', notes: '100% Genuine factory paint, zero blemishes', photoUploaded: true },
  'front-bumper': { type: 'repainted', notes: 'Minor bumper touch-up, clips intact', photoUploaded: true },
  'rear-bumper': { type: 'minor_scratch', notes: 'Parking scuff on lower lip', photoUploaded: false },
  trunk: { type: 'original', notes: 'Genuine sealants intact, factory finish', photoUploaded: true },
  'front-left-door': { type: 'original', notes: 'Original paint, seals intact', photoUploaded: false },
  'rear-left-door': { type: 'dent', notes: 'PDR-fixable micro dent near handle', photoUploaded: true },
  'front-right-door': { type: 'original', notes: 'All power switches functioning, genuine paint', photoUploaded: false },
  'rear-right-door': { type: 'original', notes: 'Clean panel, no putty detected', photoUploaded: false },
  windshield: { type: 'original', notes: 'Original AGC glass, no stone chips', photoUploaded: true },
};

const defectStyle = (type: DefectType) => {
  switch (type) {
    case 'original':
      return { fill: '#10b981', text: 'Original / Genuine', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };
    case 'minor_scratch':
      return { fill: '#eab308', text: 'Minor Scratch', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' };
    case 'dent':
      return { fill: '#f97316', text: 'Dent / Dented', badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30' };
    case 'repainted':
      return { fill: '#ef4444', text: 'Repainted / Touchup', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' };
    default:
      return { fill: '#a855f7', text: 'Replaced Panel', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30' };
  }
};

export const AutoGemzInspectionInteractive: React.FC<{ onClose?: () => void; isModal?: boolean }> = ({
  isModal = false,
}) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'architecture' | 'pdf-preview'>('diagram');
  const [role, setRole] = useState<'admin' | 'user'>('admin');
  const [selectedZoneId, setSelectedZoneId] = useState('bonnet');
  const [defects, setDefects] = useState(initialDefects);
  const [notificationSent, setNotificationSent] = useState(false);

  const selectedZone = initialZones.find((z) => z.id === selectedZoneId) ?? initialZones[0];
  const current = defects[selectedZoneId];
  const style = defectStyle(current?.type ?? 'original');

  const totalZones = Object.keys(defects).length;
  const originals = Object.values(defects).filter((d) => d.type === 'original').length;
  const minors = Object.values(defects).filter((d) => d.type === 'minor_scratch').length;
  const score = (
    ((originals * 1 + minors * 0.7 + (totalZones - originals - minors) * 0.4) / totalZones) * 10
  ).toFixed(1);

  const update = (patch: Partial<{ type: DefectType; notes: string; photoUploaded: boolean }>) => {
    if (role !== 'admin') return;
    setDefects((prev) => {
      const base = prev[selectedZoneId] ?? { type: 'original' as DefectType, notes: '', photoUploaded: false };
      return { ...prev, [selectedZoneId]: { ...base, ...patch } };
    });
  };

  const TABS = [
    { key: 'diagram' as const, label: 'SVG Car Diagram', icon: Car, short: 'Diagram' },
    { key: 'architecture' as const, label: 'AWS Architecture', icon: Server, short: 'Architecture' },
    { key: 'pdf-preview' as const, label: 'PDF Report Preview', icon: FileText, short: 'PDF Report' },
  ];

  return (
    <div
      className={`animate-pop-in bg-white dark:bg-slate-900 rounded-none sm:rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl ${
        isModal ? 'w-full sm:my-4 flex flex-col max-h-none sm:max-h-[92vh]' : ''
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-6 border-b border-slate-800 flex flex-col gap-4">
        <div className="pr-10 sm:pr-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator" /> Live Architecture Demo
            </span>
            <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
              AWS EC2 · PM2 · Cloudinary
            </span>
          </div>
          <h2 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight">AutoGemz — Vehicle Inspection Management System</h2>
          <p className="text-slate-300 text-[11px] sm:text-sm mt-1 leading-relaxed max-w-2xl">
            Full-stack MERN application featuring role-based access, interactive PakWheels-style SVG body diagrams, Cloudinary multi-zone uploads and dynamic A4 PDF reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 flex items-center text-[11px] sm:text-xs w-full sm:w-auto">
            {(['admin', 'user'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  role === r ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'admin' ? 'Admin (CRUD)' : 'User (Read)'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['react', 'nodejs', 'mongodb', 'cloudinary', 'aws'] as TechKey[]).map((t, i) => (
              <span
                key={t}
                className="tech-icon-animate w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center"
                style={{ animationDelay: `${i * 180}ms` }}
                title={t}
              >
                <TechIcon tech={t} size={15} animate={false} />
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Tabs (scrollable on mobile) */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
        <div className="flex overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const IconCmp = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`shrink-0 py-3 px-3.5 sm:px-5 text-[11px] sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <IconCmp className="w-3.5 h-3.5" />
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-6 bg-slate-50 dark:bg-slate-950/60 overflow-y-auto sm:flex-1">
        {/* ---------- DIAGRAM TAB ---------- */}
        {activeTab === 'diagram' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
            {/* Car SVG */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-white text-xs sm:text-sm">Interactive Vehicle Diagram</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-mono">PakWheels Standard</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Score:
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
                    {score} / 10
                  </span>
                </div>
              </div>

              <div className="w-full mt-2.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/30 rounded-lg p-2.5 text-[11px] text-indigo-900 dark:text-indigo-200 flex flex-wrap items-center justify-between gap-1.5">
                <span>👉 Tap any zone to inspect or tag paint condition.</span>
                <span className="font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider text-[9px] bg-indigo-100 dark:bg-indigo-500/20 px-2 py-0.5 rounded">
                  {role === 'admin' ? 'Admin Editing' : 'User Viewing'}
                </span>
              </div>

              <div className="relative w-full max-w-[320px] sm:max-w-md mx-auto py-3 flex justify-center">
                <svg viewBox="0 0 320 540" className="w-full h-auto max-h-[400px] select-none drop-shadow-md">
                  <defs>
                    <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                  </defs>

                  <rect x="30" y="90" width="18" height="50" rx="6" fill="#1e293b" />
                  <rect x="272" y="90" width="18" height="50" rx="6" fill="#1e293b" />
                  <rect x="30" y="380" width="18" height="50" rx="6" fill="#1e293b" />
                  <rect x="272" y="380" width="18" height="50" rx="6" fill="#1e293b" />

                  <path d="M70 70 C70 40 100 20 160 20 C220 20 250 40 250 70 L255 180 L255 420 C255 480 230 510 160 510 C90 510 65 480 65 420 L65 180 Z" fill="url(#carBody)" stroke="#475569" strokeWidth="3" />

                  {[
                    { id: 'front-bumper', d: 'M75 55 C95 32 140 28 160 28 C180 28 225 32 245 55 L240 75 C210 60 175 55 160 55 C145 55 110 60 80 75 Z', label: 'Front Bumper', lx: 160, ly: 52, fs: 9 },
                    { id: 'bonnet', d: 'M82 82 C105 70 145 66 160 66 C175 66 215 70 238 82 L232 170 C195 162 125 162 88 170 Z', label: 'Hood / Bonnet', lx: 160, ly: 125, fs: 12 },
                    { id: 'roof', d: 'M100 232 h120 v105 h-120 Z', label: 'Roof Top', lx: 160, ly: 288, fs: 13 },
                    { id: 'trunk', d: 'M86 388 C125 390 195 390 234 388 L238 450 C210 465 175 470 160 470 C145 470 110 465 82 450 Z', label: 'Trunk / Boot', lx: 160, ly: 425, fs: 12 },
                    { id: 'rear-bumper', d: 'M78 458 C108 475 142 478 160 478 C178 478 212 475 242 458 L246 485 C220 505 180 508 160 508 C140 508 100 505 74 485 Z', label: 'Rear Bumper', lx: 160, ly: 492, fs: 9 },
                  ].map((z, i) => (
                    <g
                      key={z.id}
                      className="cursor-pointer transition-opacity hover:opacity-80"
                      onClick={() => setSelectedZoneId(z.id)}
                    >
                      <path
                        d={z.d}
                        fill={defectStyle(defects[z.id]?.type ?? 'original').fill}
                        stroke={selectedZoneId === z.id ? '#2563eb' : '#64748b'}
                        strokeWidth={selectedZoneId === z.id ? 3.5 : 1.5}
                        className={selectedZoneId === z.id ? 'pulse-indicator' : ''}
                        style={{ transformOrigin: 'center', animationDelay: `${i * 120}ms` }}
                      />
                      <text x={z.lx} y={z.ly} textAnchor="middle" fontSize={z.fs} fontWeight="700" fill="#fff">{z.label}</text>
                    </g>
                  ))}

                  {/* windshield */}
                  <g className="cursor-pointer" onClick={() => setSelectedZoneId('windshield')}>
                    <path
                      d="M89 176 C130 168 190 168 231 176 L222 225 C185 218 135 218 98 225 Z"
                      fill={selectedZoneId === 'windshield' ? '#38bdf8' : '#cbd5e1'}
                      stroke={selectedZoneId === 'windshield' ? '#0284c7' : '#94a3b8'}
                      strokeWidth={selectedZoneId === 'windshield' ? 3 : 1.5}
                    />
                    <text x="160" y="204" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">Front Glass</text>
                  </g>

                  {/* side doors */}
                  {[
                    { id: 'front-left-door', d: 'M62 205 L95 220 L95 285 L62 285 Z', t: 'Front-R', x: 78, y: 252, rot: -90 },
                    { id: 'rear-left-door', d: 'M62 292 L95 292 L95 365 L62 355 Z', t: 'Rear-R', x: 78, y: 328, rot: -90 },
                    { id: 'front-right-door', d: 'M225 220 L258 205 L258 285 L225 285 Z', t: 'Front-L', x: 242, y: 252, rot: 90 },
                    { id: 'rear-right-door', d: 'M225 292 L258 292 L258 355 L225 365 Z', t: 'Rear-L', x: 242, y: 328, rot: 90 },
                  ].map((z) => (
                    <g key={z.id} className="cursor-pointer transition-opacity hover:opacity-80" onClick={() => setSelectedZoneId(z.id)}>
                      <path
                        d={z.d}
                        fill={defectStyle(defects[z.id]?.type ?? 'original').fill}
                        stroke={selectedZoneId === z.id ? '#2563eb' : '#64748b'}
                        strokeWidth={selectedZoneId === z.id ? 3 : 1.5}
                      />
                      <text x={z.x} y={z.y} textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff" transform={`rotate(${z.rot} ${z.x} ${z.y})`}>{z.t}</text>
                    </g>
                  ))}

                  <path d="M100 345 C135 348 185 348 220 345 L228 380 C190 384 130 384 92 380 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] sm:text-[11px]">
                {[
                  ['bg-emerald-500', 'Genuine / Original'],
                  ['bg-amber-500', 'Minor Scratch'],
                  ['bg-orange-500', 'Dent / Scratched'],
                  ['bg-rose-500', 'Repainted Panel'],
                ].map(([c, l]) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${c}`} />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Active Body Zone</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${style.badge}`}>{style.text}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{selectedZone.name}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3.5">
                  {role === 'admin' ? 'Change the condition or attach a Cloudinary photo.' : 'Read-only view — switch to Admin to edit.'}
                </p>

                <div className="space-y-2 mb-3.5">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 block">Defect Classification</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'original' as DefectType, label: '🟢 Original Paint' },
                      { key: 'minor_scratch' as DefectType, label: '🟡 Minor Scratch' },
                      { key: 'dent' as DefectType, label: '🟠 Micro Dent' },
                      { key: 'repainted' as DefectType, label: '🔴 Repainted' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={role !== 'admin'}
                        onClick={() => update({ type: opt.key })}
                        className={`text-[11px] font-semibold px-2.5 py-2 rounded-lg border text-left transition-all cursor-pointer ${
                          current?.type === opt.key
                            ? 'bg-slate-900 dark:bg-indigo-600 text-white border-slate-900 dark:border-indigo-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 mb-4">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 block">Inspector Observations</label>
                  <textarea
                    rows={2}
                    disabled={role !== 'admin'}
                    value={current?.notes ?? ''}
                    onChange={(e) => update({ notes: e.target.value })}
                    className="w-full text-[11px] p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-800/60 resize-none"
                    placeholder="Enter zone observations..."
                  />
                </div>

                {/* Cloudinary upload sim */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-800 dark:text-slate-100">
                      <UploadCloud className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Cloudinary Storage
                    </div>
                    {current?.photoUploaded ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded (HTTPS)
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">No Photo</span>
                    )}
                  </div>

                  {current?.photoUploaded ? (
                    <div className="space-y-2">
                      <div className="relative rounded-lg overflow-hidden h-28 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                        <img
                          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
                          alt="Zone inspection"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-1 right-1 bg-slate-900/80 text-[9px] text-white px-2 py-0.5 rounded font-mono">
                          zone_{selectedZoneId}.jpg
                        </div>
                      </div>
                      <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate">
                        https://res.cloudinary.com/autogemz/image/upload/v1714/inspections/{selectedZoneId}.jpg
                      </p>
                      {role === 'admin' ? (
                        <button type="button" onClick={() => update({ photoUploaded: false })} className="text-[10px] text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer">
                          Remove Photo
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">Multer memory upload → Cloudinary CDN</p>
                      {role === 'admin' ? (
                        <button
                          type="button"
                          onClick={() => update({ photoUploaded: true })}
                          className="text-[11px] px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <UploadCloud className="w-3.5 h-3.5" /> Simulate Upload
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">No image provided by inspector</span>
                      )}
                    </div>
                  )}
                </div>

                {role === 'user' ? (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                    <button
                      onClick={() => setActiveTab('pdf-preview')}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Verified PDF Inspection
                    </button>
                    <button
                      onClick={() => {
                        setNotificationSent(true);
                        setTimeout(() => setNotificationSent(false), 3000);
                      }}
                      className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Report Issue to Admin
                    </button>
                    {notificationSent ? (
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold text-center animate-fade-in">
                        ✓ Notification dispatched via Node.js backend!
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-xl text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                  <span>MERN STACK ENGINE</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator" /> 99.98% Uptime
                  </span>
                </div>
                <div className="text-slate-300">
                  Vehicle: <strong className="text-white">2022 Honda Civic RS Turbo</strong>
                </div>
                <div className="flex flex-wrap justify-between gap-1 border-t border-slate-700 pt-2 text-slate-400">
                  <span>Inspection #AG-2024-9182</span>
                  <span>Chassis FE1-1029482</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- ARCHITECTURE TAB ---------- */}
        {activeTab === 'architecture' && (
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white">AutoGemz Production Cloud Deployment</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Engineered &amp; deployed by Ali Haider on AWS EC2 &amp; Vercel</p>
                </div>
                <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 font-mono w-max">
                  Production Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Globe, cls: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300', tier: 'Frontend Tier', title: 'React 18 + Vercel', body: 'SPA on edge CDN with client-side SVG rendering, role-based routers and real-time defect state handling.', cmd: 'HTTPS / Custom Domain' },
                  { icon: Server, cls: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300', tier: 'Reverse Proxy', title: 'Nginx + SSL (Certbot)', body: 'Proxies 443 traffic to internal Node.js port 5000 with rate limiting and gzip compression.', cmd: 'proxy_pass 127.0.0.1:5000' },
                  { icon: Cpu, cls: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300', tier: 'AWS EC2 & PM2', title: 'Node.js + PM2 Cluster', body: 'Ubuntu EC2 running PM2 cluster mode with auto-restart on crash and zero-downtime reloads.', cmd: 'pm2 start server.js -i max' },
                  { icon: HardDrive, cls: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300', tier: 'Data & Media', title: 'MongoDB & Cloudinary', body: 'MongoDB stores inspection docs, roles and checklists; Cloudinary stores damage photos.', cmd: 'multer memory → Cloudinary' },
                ].map((c, i) => (
                  <div
                    key={c.title}
                    className="animate-fade-up p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:-translate-y-1 transition-transform"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <div>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold mb-3 ${c.cls}`}>
                        <c.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{c.tier}</span>
                      <h4 className="font-bold text-slate-800 dark:text-white text-xs sm:text-sm mt-0.5">{c.title}</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{c.body}</p>
                    </div>
                    <div className="mt-3.5 pt-2.5 border-t border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-500 dark:text-slate-400 truncate">{c.cmd}</div>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-slate-800 dark:text-white text-xs sm:text-sm mt-6 mb-3">Architecture Tech Stack Specification</h4>
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl -mx-4 sm:mx-0">
                <table className="w-full min-w-[520px] text-[11px] sm:text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 sm:px-4">Layer</th>
                      <th className="py-2.5 px-3 sm:px-4">Technology</th>
                      <th className="py-2.5 px-3 sm:px-4">Implementation Highlights</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      ['Frontend', 'React.js 18, Bootstrap 5, React Router v6', 'Dynamic SVG car diagram, responsive inspection UI, client-side route guards'],
                      ['Backend', 'Node.js, Express.js', 'RESTful endpoints, error-handling middleware, modular controllers'],
                      ['Database', 'MongoDB, Mongoose ODM', 'Schema with nested zone defects, checklists, index optimization'],
                      ['Auth & Security', 'JWT (jsonwebtoken), bcryptjs', '2-role system (Admin / User), token verification, secure hashing'],
                      ['Image Storage', 'Cloudinary (multer memory upload)', 'Per-zone & per-item uploads with permanent HTTPS URLs in PDF'],
                      ['PDF Generator', 'Server-side HTML template, print-to-PDF', 'A4 print-optimized layout, category ratings, embedded photos'],
                      ['Deployment', 'AWS EC2 (backend), Vercel (frontend)', 'Environment-based API configuration with CORS setup'],
                      ['Process Manager', 'PM2', 'Auto service recovery, logging daemon, cluster configuration'],
                      ['Web Server', 'Nginx (reverse proxy)', "SSL termination via Let's Encrypt, proxying, static caching"],
                    ].map((row, i) => (
                      <tr key={row[0]} className={i % 2 ? 'bg-slate-50/60 dark:bg-slate-800/40' : ''}>
                        <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-800 dark:text-white">{row[0]}</td>
                        <td className="py-2.5 px-3 sm:px-4 text-indigo-600 dark:text-indigo-400 font-medium">{row[1]}</td>
                        <td className="py-2.5 px-3 sm:px-4 text-slate-600 dark:text-slate-300">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {(['react', 'nodejs', 'express', 'mongodb', 'jwt', 'cloudinary', 'aws', 'nginx', 'pm2', 'vercel'] as TechKey[]).map((t, i) => (
                  <span
                    key={t}
                    className="tech-icon-animate w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                    style={{ animationDelay: `${i * 150}ms` }}
                    title={t}
                  >
                    <TechIcon tech={t} size={19} animate={false} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- PDF PREVIEW TAB ---------- */}
        {activeTab === 'pdf-preview' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Automated A4 Print-Optimized Inspection Report</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Dynamic template with category ratings, zone summary and Cloudinary HTTPS photos</p>
              </div>
              <button
                onClick={() => window.print()}
                className="no-print px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-none sm:rounded-xl border border-slate-200 dark:border-slate-800 shadow max-w-3xl mx-auto text-slate-800 dark:text-slate-200">
              <div className="border-b-2 border-indigo-600 pb-3.5 flex flex-col sm:flex-row sm:justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg sm:text-xl font-extrabold tracking-tight text-indigo-900 dark:text-indigo-300">AutoGemz</span>
                    <span className="text-[9px] sm:text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 font-bold px-2 py-0.5 rounded">INSPECTION REPORT</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Certified 200+ Point Comprehensive Vehicle Evaluation</p>
                </div>
                <div className="text-left sm:text-right text-[10px] sm:text-[11px]">
                  <div className="font-bold text-slate-700 dark:text-slate-200">REPORT #: AG-2024-9182</div>
                  <div className="text-slate-500 dark:text-slate-400">Date: {new Date().toLocaleDateString('en-GB')}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified on AWS Cloud</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="sm:col-span-2">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">2022 Honda Civic RS Turbo 1.5L</h4>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300">
                    <div><strong>Mileage:</strong> 28,450 km</div>
                    <div><strong>Color:</strong> White Orchid Pearl</div>
                    <div><strong>Transmission:</strong> CVT Auto</div>
                    <div><strong>Chassis:</strong> FE1-1029482</div>
                    <div><strong>Fuel:</strong> Petrol</div>
                    <div><strong>Engine:</strong> 1498cc VTEC Turbo</div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:justify-center sm:border-l border-slate-200 dark:border-slate-700 sm:pl-4 gap-1.5 sm:gap-0.5">
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Condition</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{score}</span>
                  <span className="text-[9px] text-slate-500">out of 10.0</span>
                  <span className="text-[9px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">Grade A — Recommended</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] sm:text-xs mb-4">
                {[
                  ['Engine & Gearbox', '9.2', 'text-emerald-600 dark:text-emerald-400'],
                  ['Body & Exterior', score, 'text-indigo-600 dark:text-indigo-400'],
                  ['Brakes & Suspension', '8.8', 'text-emerald-600 dark:text-emerald-400'],
                  ['Interior & AC', '9.5', 'text-emerald-600 dark:text-emerald-400'],
                ].map(([label, val, cls], i) => (
                  <div key={label} className="animate-fade-up p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="text-[9px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">{label}</div>
                    <div className={`text-sm sm:text-base font-bold mt-0.5 ${cls}`}>{val} / 10</div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h5 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2">Zone-by-Zone Body Evaluation</h5>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full min-w-[440px] text-[10px] sm:text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-[9px] sm:text-[11px]">
                      <tr>
                        <th className="p-2">Zone</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Inspection Notes</th>
                        <th className="p-2 text-center">Photo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {initialZones.map((zone) => {
                        const d = defects[zone.id];
                        const s = defectStyle(d?.type ?? 'original');
                        return (
                          <tr key={zone.id}>
                            <td className="p-2 font-medium text-slate-800 dark:text-slate-200">{zone.name}</td>
                            <td className="p-2">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border whitespace-nowrap ${s.badge}`}>{s.text}</span>
                            </td>
                            <td className="p-2 text-slate-600 dark:text-slate-300">{d?.notes || 'No issues observed.'}</td>
                            <td className="p-2 text-center">
                              {d?.photoUploaded ? (
                                <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-mono underline">[Cloudinary]</span>
                              ) : (
                                <span className="text-slate-400 text-[9px]">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-1 text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400">
                <div>Engineered by Ali Haider (Full Stack MERN Developer) • Hosted on AWS EC2</div>
                <div>Signed &amp; Verified by AutoGemz Senior Inspector</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
