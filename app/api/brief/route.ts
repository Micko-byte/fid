import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderBrandedEmail } from "@/lib/email-template";

/**
 * Discovery Brief handler — emails a completed briefing form to Farida.
 *
 * Uses the same SMTP_* environment variables as /api/contact (set them in
 * Vercel → Project → Settings → Environment Variables; never commit them).
 * The client sends the answers already grouped into the document's sections,
 * so this route only has to validate the contact details and format the mail.
 */

const RECIPIENTS = process.env.CONTACT_TO || "info@fidco.africa, info@fidpr.ke";

type Section = { title: string; items: { label: string; value: string }[] };

export async function POST(req: Request) {
  let body: { name?: string; email?: string; company?: string; sections?: Section[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const sections = Array.isArray(body.sections) ? body.sections : [];

  if (!name || !email || !company) {
    return NextResponse.json({ ok: false, error: "Company, name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[brief] SMTP env vars not configured — cannot send email.");
    return NextResponse.json({ ok: false, error: "Email is not configured yet." }, { status: 503 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = sections
    .map((s) => `${s.title}\n${"-".repeat(s.title.length)}\n` + s.items.map((i) => `${i.label}\n${i.value}\n`).join("\n"))
    .join("\n\n");

  try {
    await transporter.sendMail({
      from: `"FID & Co. website" <${SMTP_USER}>`,
      to: RECIPIENTS,
      replyTo: email,
      subject: `Discovery Brief — ${company} (${name})`,
      text: `Discovery Brief\n\nCompany: ${company}\nName: ${name}\nEmail: ${email}\n\n${text}`,
      html: renderBrandedEmail({
        title: "Discovery Brief",
        subtitle: `${company} · ${name} · ${email}`,
        replyEmail: email,
        // Long prose answers read better as panels than as cramped table rows.
        sections: sections.map((s) => ({
          title: s.title,
          items: s.items.map((i) => ({ ...i, block: i.value.length > 80 || i.value.includes("\n") })),
        })),
      }),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[brief] send failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send your brief." }, { status: 502 });
  }
}

