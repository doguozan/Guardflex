import nodemailer from 'nodemailer';

let transporter = null;

/**
 * SMTP ist optional: Ohne SMTP_HOST / SMTP_USER / SMTP_PASS wird nichts gesendet.
 */
export function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS !== undefined
  );
}

function getTransporter() {
  if (!isMailConfigured()) {
    return null;
  }
  if (transporter) {
    return transporter;
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1';
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Benachrichtigung an interne Adresse(n) bei neuer Kontaktanfrage.
 * @returns {{ sent: boolean, reason?: string }}
 */
export async function sendContactFormNotification(payload) {
  const { name, email, phone, message, subject, id } = payload;
  const transport = getTransporter();

  if (!transport) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[mail] SMTP nicht konfiguriert – keine E-Mail gesendet.');
    }
    return { sent: false, reason: 'not_configured' };
  }

  const toRaw = process.env.MAIL_TO?.trim() || process.env.SMTP_USER.trim();
  const to = toRaw.split(',').map((a) => a.trim()).filter(Boolean);
  const from = (process.env.MAIL_FROM || process.env.SMTP_USER).trim();
  const subj =
    subject?.trim() ||
    `[GuardFlex] Neue Kontaktanfrage von ${name}`;

  const text = `
Neue Kontaktanfrage

Datenbank-ID: ${id}
Name: ${name}
E-Mail: ${email}
Telefon: ${phone || '—'}

Nachricht:
${message}
`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; line-height: 1.5; color: #111;">
<h2 style="margin-bottom: 0.5rem;">Neue Kontaktanfrage</h2>
<p style="color:#666;font-size:14px;">ID: ${escapeHtml(String(id))}</p>
<table cellpadding="8" style="border-collapse:collapse;">
  <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
  <tr><td><strong>E-Mail</strong></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
  <tr><td><strong>Telefon</strong></td><td>${escapeHtml(phone || '—')}</td></tr>
</table>
<h3 style="margin-top:1.5rem;">Nachricht</h3>
<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
</body>
</html>`;

  try {
    await transport.sendMail({
      from: `"GuardFlex Website" <${from}>`,
      to,
      replyTo: email,
      subject: subj,
      text,
      html,
    });
    console.log('[mail] Kontaktbenachrichtigung gesendet an:', to.join(', '));
    return { sent: true };
  } catch (err) {
    console.error('[mail] Versand fehlgeschlagen:', err.message);
    return { sent: false, reason: err.message };
  }
}
