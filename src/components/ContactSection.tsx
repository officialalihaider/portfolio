import { useEffect, useState, type FormEvent } from 'react';
import { Check, CheckCircle2, Clock, Copy, Loader2, Mail, MapPin, MessageCircle, Phone, RotateCcw, Send } from 'lucide-react';
import { cvData } from '../data/cvData';
import { openWhatsAppApp, openWhatsAppWeb, sendContactEmail } from '../utils/contact';

function usePakistanTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const hour =
    Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', hour12: false }).format(now)) % 24;
  return { time, online: hour >= 9 && hour < 22 };
}

const TOPICS = ['Full Stack Project', 'Frontend / UI Work', 'Job Opportunity', 'Freelance / Contract', 'Just saying hi'];
const EMPTY = { name: '', email: '', topic: TOPICS[0], message: '' };

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactSection() {
  const { time, online } = usePakistanTime();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = (needEmail: boolean) => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name';
    if (needEmail && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const waText = () =>
    `Hi Ali, I'm ${form.name.trim()} (${form.topic}).\n\n${form.message.trim()}${
      form.email.trim() ? `\n\nMy email: ${form.email.trim()}` : ''
    }`;

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === 'sending' || !validate(true)) return;
    setStatus('sending');
    setServerError('');
    const res = await sendContactEmail({
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      message: form.message.trim(),
    });
    if (res.ok) {
      setStatus('sent');
      setForm(EMPTY);
    } else {
      setStatus('error');
      setServerError(res.error ?? 'Something went wrong.');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(cvData.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const field =
    'w-full rounded-xl border bg-white dark:bg-slate-900/70 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-colors';

  return (
    <section id="contact" className="reveal scroll-mt-24">
      <div className="text-center mb-8 space-y-2">
        <span className="section-kicker">
          <Send className="w-3 h-3" /> Let's Work Together
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Have a project in mind?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Send a message right from here — it lands straight in my inbox. Prefer chat? WhatsApp works too.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
        {/* Info column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> My local time (PKT)
              </div>
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  online
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                    : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full pulse-indicator ${online ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {online ? 'Likely online' : 'Probably offline'}
              </span>
            </div>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight text-slate-900 dark:text-white">
              {time}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5" /> {cvData.personal.location}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 shadow-sm space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 flex items-center gap-2.5 p-2.5">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Email</span>
                  <span className="block text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">{cvData.personal.email}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email"
                className="w-9 h-9 shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={`tel:${cvData.personal.phone}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="w-9 h-9 shrink-0 rounded-lg bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Phone / WhatsApp</span>
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-100 font-mono">{cvData.personal.phone}</span>
              </span>
            </a>

            <div className="grid grid-cols-2 gap-2 p-1.5">
              <button
                type="button"
                onClick={() => openWhatsAppApp("Hi Ali, I found your portfolio and I'd like to talk.")}
                className="px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp App
              </button>
              <button
                type="button"
                onClick={() => openWhatsAppWeb("Hi Ali, I found your portfolio and I'd like to talk.")}
                className="px-3 py-2.5 rounded-xl border border-emerald-500/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Web
              </button>
            </div>
          </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm">
          {status === 'sent' ? (
            <div className="animate-pop-in h-full min-h-[360px] flex flex-col items-center justify-center text-center gap-3 py-6">
              <span className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Message sent!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm">
                Thanks for reaching out. Your message is in my inbox and I'll reply to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">Your name</label>
                  <input
                    id="c-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`${field} ${errors.name ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                  {errors.name ? <p className="mt-1 text-[11px] text-rose-500">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">Your email</label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    className={`${field} ${errors.email ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                  {errors.email ? <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p> : null}
                </div>
              </div>

              <div>
                <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-1.5">What's this about?</span>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, topic: t })}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        form.topic === t
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="c-msg" className="block text-[11px] font-bold text-slate-700 dark:text-slate-200">Message</label>
                  <span className="text-[10px] text-slate-400 tabular-nums">{form.message.length}/600</span>
                </div>
                <textarea
                  id="c-msg"
                  rows={5}
                  maxLength={600}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, timeline and budget…"
                  className={`${field} resize-none ${errors.message ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'}`}
                />
                {errors.message ? <p className="mt-1 text-[11px] text-rose-500">{errors.message}</p> : null}
              </div>

              {status === 'error' ? (
                <div className="animate-fade-up rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 p-3 text-xs text-rose-700 dark:text-rose-300">
                  <strong className="block mb-0.5">Couldn't send the email.</strong>
                  {serverError} You can still reach me instantly on WhatsApp using the button below.
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="shine flex-1 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-wait text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!validate(false)) return;
                    openWhatsAppApp(waText());
                  }}
                  className="flex-1 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Send on WhatsApp
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                WhatsApp opens the app on {cvData.personal.phone}. On desktop without the app, use “WhatsApp Web” on the left.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
