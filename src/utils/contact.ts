import { cvData } from '../data/cvData';

/** Digits only, e.g. 923156500236 */
export const WA_NUMBER = cvData.personal.phone.replace(/\D/g, '');

const isMobile = () =>
  typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const withText = (text?: string) => (text ? `&text=${encodeURIComponent(text)}` : '');

/** Opens the installed WhatsApp app directly (no wa.me / api.whatsapp.com involved). */
export const whatsappAppUrl = (text?: string) => `whatsapp://send?phone=${WA_NUMBER}${withText(text)}`;

/** Opens WhatsApp Web directly on the same number. */
export const whatsappWebUrl = (text?: string) => `https://web.whatsapp.com/send?phone=${WA_NUMBER}${withText(text)}`;

export function openWhatsAppApp(text?: string) {
  window.open(whatsappAppUrl(text), '_self');
}

export function openWhatsAppWeb(text?: string) {
  window.open(whatsappWebUrl(text), '_blank', 'noopener,noreferrer');
}

/** Mobile → WhatsApp app, Desktop → WhatsApp Web. */
export function openWhatsApp(text?: string) {
  if (isMobile()) openWhatsAppApp(text);
  else openWhatsAppWeb(text);
}

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

/**
 * Sends the message straight to the portfolio owner's inbox (no mail app opens).
 * Uses FormSubmit's AJAX endpoint, which works from the browser without a backend.
 */
export async function sendContactEmail(p: ContactPayload): Promise<SendResult> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${cvData.personal.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: p.name,
        email: p.email,
        _replyto: p.email,
        topic: p.topic,
        message: p.message,
        _subject: `[Portfolio] ${p.topic} — ${p.name}`,
        _template: 'table',
        _captcha: 'false',
        _honey: '',
      }),
      signal: controller.signal,
    });
    const data: { success?: boolean | string; message?: string } = await res.json().catch(() => ({}));
    const ok = res.ok && (data.success === true || data.success === 'true');
    return ok ? { ok: true } : { ok: false, error: data.message || 'The message could not be delivered.' };
  } catch {
    return { ok: false, error: 'Network problem — please check your connection and try again.' };
  } finally {
    window.clearTimeout(timer);
  }
}
