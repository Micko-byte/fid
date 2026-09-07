/**
 * Branded HTML shell for the emails the site sends (contact enquiries and
 * Discovery Briefs).
 *
 * Written for email clients, not browsers: nested tables, inline styles, no
 * flexbox/grid, no external CSS and no web fonts. Outlook ignores most modern
 * CSS, and Gmail strips <style> blocks, so every rule sits on the element.
 * Rounded corners and the like degrade to squared-off boxes rather than break.
 */

const MAROON = "#750006";
const DEEP = "#260000";
const CREAM = "#f5f2ec";
const TEAL = "#2f7f7a";
const INK = "#1c1c1c";
const FONT = "Helvetica,Arial,sans-serif";

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

export interface EmailItem {
  label: string;
  value: string;
  /** Renders the value as a block of prose rather than a table row. */
  block?: boolean;
}

export interface EmailSection {
  title?: string;
  items: EmailItem[];
}

function renderItem(item: EmailItem) {
  const value = escapeHtml(item.value).replace(/\n/g, "<br>");

  if (item.block) {
    return `
      <tr><td style="padding:0 0 6px">
        <div style="font-family:${FONT};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${MAROON};font-weight:bold;padding-bottom:6px">${escapeHtml(item.label)}</div>
        <div style="font-family:${FONT};font-size:15px;line-height:1.65;color:${INK};background:${CREAM};border-left:3px solid ${TEAL};padding:14px 16px">${value}</div>
      </td></tr>
      <tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>`;
  }

  return `
    <tr>
      <td style="font-family:${FONT};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${MAROON};font-weight:bold;padding:0 16px 4px 0;vertical-align:top;white-space:nowrap">${escapeHtml(item.label)}</td>
      <td style="font-family:${FONT};font-size:15px;line-height:1.6;color:${INK};padding:0 0 4px">${value}</td>
    </tr>
    <tr><td colspan="2" style="border-bottom:1px solid #ece5da;height:10px;line-height:10px;font-size:0">&nbsp;</td></tr>
    <tr><td colspan="2" style="height:10px;line-height:10px;font-size:0">&nbsp;</td></tr>`;
}

function renderSection(section: EmailSection) {
  const heading = section.title
    ? `<tr><td style="padding:6px 0 14px">
         <span style="font-family:${FONT};font-size:12px;letter-spacing:1.6px;text-transform:uppercase;color:${DEEP};font-weight:bold;border-bottom:2px solid ${MAROON};padding-bottom:4px">${escapeHtml(section.title)}</span>
       </td></tr>`
    : "";

  // Block items sit outside the label/value grid so their panel spans the card.
  const rows = section.items.filter((i) => !i.block);
  const blocks = section.items.filter((i) => i.block);

  const grid = rows.length
    ? `<tr><td style="padding:0 0 4px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows.map(renderItem).join("")}</table></td></tr>`
    : "";
  const blockRows = blocks.length
    ? `<tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${blocks.map(renderItem).join("")}</table></td></tr>`
    : "";

  return `${heading}${grid}${blockRows}<tr><td style="height:12px;line-height:12px;font-size:0">&nbsp;</td></tr>`;
}

export function renderBrandedEmail(opts: {
  /** Big heading inside the maroon band, e.g. "New website enquiry". */
  title: string;
  /** Small line under the heading, e.g. the company and sender. */
  subtitle?: string;
  sections: EmailSection[];
  /** Adds a reply button addressed to this sender. */
  replyEmail?: string;
}) {
  const { title, subtitle, sections, replyEmail } = opts;

  const reply = replyEmail
    ? `<tr><td style="padding:8px 0 4px">
         <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
           <td style="background:${MAROON};padding:13px 26px">
             <a href="mailto:${escapeHtml(replyEmail)}" style="font-family:${FONT};font-size:12px;letter-spacing:1.4px;text-transform:uppercase;font-weight:bold;color:#ffffff;text-decoration:none">Reply to ${escapeHtml(replyEmail)}</a>
           </td>
         </tr></table>
       </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${CREAM};-webkit-text-size-adjust:100%">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${CREAM}">
    <tr><td align="center" style="padding:28px 12px">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e7ded1">

        <!-- brand band -->
        <tr><td style="background:${MAROON};padding:26px 32px">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.1;color:#ffffff;font-weight:bold;letter-spacing:-0.5px">FID <span style="font-size:18px">&amp; Co.</span></div>
          <div style="font-family:${FONT};font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#e8c9c0;padding-top:7px">Insight &middot; Strategy &middot; Impact</div>
        </td></tr>

        <!-- title -->
        <tr><td style="padding:28px 32px 6px">
          <div style="font-family:${FONT};font-size:21px;line-height:1.25;color:${DEEP};font-weight:bold">${escapeHtml(title)}</div>
          ${subtitle ? `<div style="font-family:${FONT};font-size:13px;line-height:1.5;color:#7a7068;padding-top:6px">${escapeHtml(subtitle)}</div>` : ""}
        </td></tr>

        <!-- body -->
        <tr><td style="padding:16px 32px 26px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${sections.map(renderSection).join("")}
            ${reply}
          </table>
        </td></tr>

        <!-- footer -->
        <tr><td style="background:${CREAM};border-top:1px solid #e7ded1;padding:20px 32px">
          <div style="font-family:${FONT};font-size:12px;line-height:1.7;color:#7a7068">
            Sent from <a href="https://fidco.africa" style="color:${MAROON};text-decoration:none;font-weight:bold">fidco.africa</a><br>
            Nairobi, Kenya &middot; +254 797 690 609 &middot; info@fidco.africa
          </div>
        </td></tr>

      </table>

      <div style="font-family:${FONT};font-size:11px;color:#a2988d;padding-top:14px">FID &amp; Co. &middot; Strategic Communications &amp; Brand Experiences Across Africa</div>

    </td></tr>
  </table>
</body></html>`;
}
