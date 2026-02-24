/**
 * Cloudflare Pages Function — POST /feedback
 *
 * Receives wireframe feedback submissions and forwards them as email
 * to ryder@rydersdesign.com via the Resend API.
 *
 * Setup (one-time):
 *   1. Sign up free at https://resend.com
 *   2. Go to Domains → Add Domain → add rydersdesign.com
 *      (adds two DNS records — takes ~5 min to verify)
 *   3. Go to API Keys → Create API Key → copy it
 *   4. In Cloudflare Pages dashboard:
 *      Settings → Environment Variables → add:
 *        RESEND_API_KEY = re_xxxxxxxxxxxx
 *   5. Redeploy (or just push a commit — Pages redeploys automatically)
 *
 * The `from` address must be on a verified Resend domain.
 * Once rydersdesign.com is verified, feedback@rydersdesign.com will work.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS preflight handled by onRequestOptions below
  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const {
    page        = '—',
    type        = '—',
    severity    = '—',
    description = '',
    reviewer    = 'Anonymous',
    email       = '',
    screenshot  = 'None',
  } = data;

  const subject = `[PCP Feedback] ${page} — ${type}${severity && severity !== '—' ? ' · ' + severity : ''}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;color:#1e2a3a;">
      <div style="background:#1e2a3a;padding:20px 28px;border-radius:8px 8px 0 0;">
        <span style="color:white;font-size:15px;font-weight:700;">PCP Wireframe Feedback</span>
      </div>
      <div style="background:#f5f7fb;padding:20px 28px;border:1px solid #dce4ef;border-top:none;">
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="padding:6px 0;color:#6b7f99;width:110px;font-weight:600;">Page</td>
              <td style="padding:6px 0;font-weight:600;">${escHtml(page)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7f99;font-weight:600;">Type</td>
              <td style="padding:6px 0;">${escHtml(type)}</td></tr>
          ${severity && severity !== '—' ? `
          <tr><td style="padding:6px 0;color:#6b7f99;font-weight:600;">Severity</td>
              <td style="padding:6px 0;">${escHtml(severity)}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#6b7f99;font-weight:600;">Reviewer</td>
              <td style="padding:6px 0;">${escHtml(reviewer)}</td></tr>
          ${email ? `
          <tr><td style="padding:6px 0;color:#6b7f99;font-weight:600;">Email</td>
              <td style="padding:6px 0;"><a href="mailto:${escHtml(email)}" style="color:#3d6daa;">${escHtml(email)}</a></td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#6b7f99;font-weight:600;">Screenshot</td>
              <td style="padding:6px 0;">${escHtml(screenshot)}</td></tr>
        </table>
      </div>
      <div style="background:white;padding:20px 28px;border:1px solid #dce4ef;border-top:none;border-radius:0 0 8px 8px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#6b7f99;text-transform:uppercase;letter-spacing:.05em;">
          ${type === 'transcript' ? 'Transcript' : 'Description'}
        </p>
        <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escHtml(description)}</p>
      </div>
      <p style="font-size:11px;color:#b0bdd0;margin-top:12px;text-align:center;">
        Sent from the PCP wireframe feedback system · <a href="https://eqpartners.pages.dev/wf-feedback.html" style="color:#b0bdd0;">Open tracker</a>
      </p>
    </div>
  `;

  if (!env.RESEND_API_KEY) {
    // No API key configured — return success so the UI doesn't break,
    // but log a warning (visible in Cloudflare Pages function logs)
    console.warn('[feedback] RESEND_API_KEY not set — email not sent');
    return jsonResponse({ ok: true, warn: 'RESEND_API_KEY not configured' }, 200);
  }

  let resendRes;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'PCP Feedback <feedback@rydersdesign.com>',
        to:      ['ryder@rydersdesign.com'],
        subject: subject,
        html:    html,
      }),
    });
  } catch (err) {
    console.error('[feedback] Resend fetch failed:', err.message);
    return jsonResponse({ error: 'Email service unreachable' }, 502);
  }

  const resendBody = await resendRes.json().catch(() => ({}));

  if (!resendRes.ok) {
    console.error('[feedback] Resend error:', resendBody);
    return jsonResponse({ error: resendBody.message || 'Send failed', details: resendBody }, 500);
  }

  return jsonResponse({ ok: true, id: resendBody.id });
}

// Handle CORS preflight for cross-origin POST
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
