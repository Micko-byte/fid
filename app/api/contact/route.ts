import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderBrandedEmail } from "@/lib/email-template";

/**
 * Contact form handler — emails submissions to Farida.
 *
 * Delivery uses SMTP credentials from environment variables (set these in
 * Vercel → Project → Settings → Environment Variables; never commit them):
 *   SMTP_HOST      e.g. mail.fidpr.ke
 *   SMTP_PORT      465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER      the mailbox login, e.g. info@fidpr.ke
 *   SMTP_PASS      that mailbox's password
 *   CONTACT_TO     optional; defaults to both Farida addresses
 * Until these are set the route returns a clear "not configured" error rather
 * than silently dropping the message.
 */

const RECIPIENTS = process.env.CONTACT_TO || "info@fidco.africa, info@fidpr.ke";

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const service = (data.service || "").trim();
  const message = (data.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP env vars not configured — cannot send email.");
    return NextResponse.json({ ok: false, error: "Email is not configured yet." }, { status: 503 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"FID & Co. website" <${SMTP_USER}>`,
      to: RECIPIENTS,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      text: `New contact form enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nService: ${service || "—"}\n\nMessage:\n${message}`,
      html: renderBrandedEmail({
        title: "New website enquiry",
        subtitle: `${name}${service ? ` · ${service}` : ""}`,
        replyEmail: email,
        sections: [
          {
            items: [
              { label: "Name", value: name },
              { label: "Email", value: email },
              { label: "Phone", value: phone || "—" },
              { label: "Service", value: service || "—" },
              { label: "Message", value: message, block: true },
            ],
          },
        ],
      }),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send your message. Please email us directly." }, { status: 502 });
  }
}
