import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const html = sections
    .map(
      (s) => `<h3 style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#750006;margin:26px 0 8px">${escapeHtml(s.title)}</h3>` +
        s.items
          .map(
            (i) =>
              `<p style="margin:0 0 10px;font-size:14px;line-height:1.6"><span style="color:#2f7f7a;font-weight:700">${escapeHtml(i.label)}</span><br>${escapeHtml(i.value).replace(/\n/g, "<br>")}</p>`,
          )
          .join(""),
    )
    .join("");

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
      html: `<div style="font-family:Arial,sans-serif;color:#1c1c1c;max-width:640px">
        <h2 style="color:#260000;margin:0 0 4px">Discovery Brief</h2>
        <p style="margin:0 0 18px;font-size:14px;color:#555">${escapeHtml(company)} · ${escapeHtml(name)} · ${escapeHtml(email)}</p>
        ${html}
      </div>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[brief] send failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send your brief." }, { status: 502 });
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
