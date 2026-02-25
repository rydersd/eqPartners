/**
 * wireframe-signals.js — Partner Intelligence Signal Layer
 * Equinix Partner Connect Portal · PCP Design System
 *
 * Usage: place a mount div anywhere between the context bar and page content:
 *
 *   <div class="wf-signal-mount"
 *        data-partner="CloudBridge Solutions"
 *        data-signals='[
 *          {
 *            "type": "program",
 *            "icon": "⚡",
 *            "label": "Fabric Attach",
 *            "headline": "Fabric attach opportunity",
 *            "body": "84% of comparable deals include Fabric. Partners who attach close 2.3× faster and retain at 1.8× the rate.",
 *            "metric": "2.3×",
 *            "metricLabel": "faster close",
 *            "action": "See Fabric attach guide",
 *            "actionHref": "isv-resources.html#fabric-attach"
 *          }
 *        ]'>
 *   </div>
 *   <script src="wireframe-signals.js"></script>
 *
 * Signal types: program | risk | opportunity | insight
 *
 * Signal type semantics:
 *   program     — tied to an active Equinix partner program (Fabric Attach, etc.)
 *                 color: blue. Signals what the program recommends in this context.
 *   risk        — something that may go wrong or already shows a warning pattern.
 *                 color: amber. Signals friction, churn risk, compliance gap.
 *   opportunity — a positive action the partner or PSM/PAM could take right now.
 *                 color: green. Signals upside.
 *   insight     — a neutral observation derived from pattern matching.
 *                 color: slate. Signals "here's what we noticed."
 *
 * Data story note:
 *   Signals use pseudo-realistic data — numbers and patterns that feel real
 *   without exposing actual partner data. The signal layer is also the design
 *   hypothesis for what an AI-powered partner portal would surface if Equinix
 *   unified its partner data (CRM, portal activity, API telemetry, MDF ledger,
 *   training completion, deal velocity) into a single partner intelligence graph.
 */

(function () {
  'use strict';

  const TYPE_META = {
    program:     { icon: '⚡', label: 'Program Signal',  pillClass: 'program',     cardClass: 'program'     },
    risk:        { icon: '⚠',  label: 'Risk Detected',   pillClass: 'risk',        cardClass: 'risk'        },
    opportunity: { icon: '↑',  label: 'Opportunity',     pillClass: 'opportunity', cardClass: 'opportunity' },
    insight:     { icon: '◎',  label: 'Insight',         pillClass: 'insight',     cardClass: 'insight'     },
  };

  function buildBar(mount, signals, partner) {
    const meta = TYPE_META;

    /* ── Collapsed bar ── */
    const bar = document.createElement('div');
    bar.className = 'wf-signal-bar';
    bar.setAttribute('role', 'button');
    bar.setAttribute('aria-expanded', 'false');
    bar.setAttribute('aria-controls', 'wf-signal-panel');
    bar.setAttribute('tabindex', '0');
    bar.setAttribute('title', 'Partner Intelligence — click to expand');

    const barLabel = document.createElement('span');
    barLabel.className = 'wf-signal-bar-label';
    barLabel.innerHTML = `<span class="wf-signal-icon">🤖</span> Partner Intelligence`;

    const pills = document.createElement('span');
    pills.className = 'wf-signal-pills';
    signals.slice(0, 3).forEach(sig => {
      const m = meta[sig.type] || meta.insight;
      const pill = document.createElement('span');
      pill.className = `wf-signal-pill ${m.pillClass}`;
      pill.textContent = `${m.icon} ${sig.label}`;
      pills.appendChild(pill);
    });

    const toggle = document.createElement('span');
    toggle.className = 'wf-signal-bar-toggle';
    toggle.textContent = `${signals.length} signal${signals.length !== 1 ? 's' : ''} · Expand ↓`;

    bar.appendChild(barLabel);
    bar.appendChild(pills);
    bar.appendChild(toggle);

    /* ── Expanded panel ── */
    const panel = document.createElement('div');
    panel.className = 'wf-signal-panel';
    panel.id = 'wf-signal-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Partner intelligence signals');

    const hd = document.createElement('div');
    hd.className = 'wf-signal-panel-hd';

    const title = document.createElement('span');
    title.className = 'wf-signal-panel-title';
    title.innerHTML = `🤖 Partner Intelligence`;

    const ctx = document.createElement('span');
    ctx.className = 'wf-signal-panel-context';
    ctx.textContent = partner ? `${signals.length} signal${signals.length !== 1 ? 's' : ''} for ${partner}` : `${signals.length} signal${signals.length !== 1 ? 's' : ''}`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'wf-signal-panel-close';
    closeBtn.textContent = 'Collapse ↑';
    closeBtn.setAttribute('aria-label', 'Collapse signal panel');

    hd.appendChild(title);
    hd.appendChild(ctx);
    hd.appendChild(closeBtn);

    const cards = document.createElement('div');
    cards.className = 'wf-signal-cards';

    signals.forEach(sig => {
      const m = meta[sig.type] || meta.insight;
      const card = document.createElement('div');
      card.className = `wf-signal-card ${m.cardClass}`;

      const typeRow = document.createElement('div');
      typeRow.className = 'wf-signal-card-type';
      typeRow.innerHTML = `${m.icon} ${m.label}`;

      const headline = document.createElement('div');
      headline.className = 'wf-signal-card-headline';
      headline.textContent = sig.headline;

      const body = document.createElement('div');
      body.className = 'wf-signal-card-body';
      body.textContent = sig.body;

      card.appendChild(typeRow);
      card.appendChild(headline);

      if (sig.metric) {
        const metricWrap = document.createElement('div');
        const metricVal = document.createElement('div');
        metricVal.className = 'wf-signal-card-metric';
        metricVal.textContent = sig.metric;
        const metricLbl = document.createElement('div');
        metricLbl.style.cssText = 'font-size:10px;color:#4a6080;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;';
        metricLbl.textContent = sig.metricLabel || '';
        metricWrap.appendChild(metricVal);
        metricWrap.appendChild(metricLbl);
        card.appendChild(metricWrap);
      }

      card.appendChild(body);

      if (sig.action) {
        const action = document.createElement('a');
        action.className = 'wf-signal-card-action';
        action.textContent = sig.action + ' →';
        action.href = sig.actionHref || '#';
        card.appendChild(action);
      }

      cards.appendChild(card);
    });

    panel.appendChild(hd);
    panel.appendChild(cards);

    /* ── Toggle logic ── */
    function openPanel() {
      panel.classList.add('open');
      bar.setAttribute('aria-expanded', 'true');
      toggle.textContent = `${signals.length} signal${signals.length !== 1 ? 's' : ''} · Collapse ↑`;
    }
    function closePanel() {
      panel.classList.remove('open');
      bar.setAttribute('aria-expanded', 'false');
      toggle.textContent = `${signals.length} signal${signals.length !== 1 ? 's' : ''} · Expand ↓`;
    }

    bar.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
    bar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); panel.classList.contains('open') ? closePanel() : openPanel(); }});
    closeBtn.addEventListener('click', e => { e.stopPropagation(); closePanel(); });

    /* ── Mount ── */
    mount.parentNode.insertBefore(bar, mount);
    mount.parentNode.insertBefore(panel, mount);
    mount.remove();
  }

  function init() {
    document.querySelectorAll('.wf-signal-mount').forEach(mount => {
      let signals = [];
      try { signals = JSON.parse(mount.dataset.signals || '[]'); } catch (e) { console.warn('wf-signals: invalid JSON in data-signals', e); }
      if (!signals.length) return;
      const partner = mount.dataset.partner || '';
      buildBar(mount, signals, partner);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
