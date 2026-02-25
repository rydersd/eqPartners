/* ═══════════════════════════════════════════════════════════════
   wf-nav.js — Wireframe Navigation Component
   Equinix Partner Channel Program (PCP) Wireframes

   Injects a three-layer wrapper onto every wireframe page:
     1. Context bar  — wireframe tool: hamburger · breadcrumbs · persona chip · Feedback · Notes
     2. App bar      — existing wf-header (Salesforce Experience Cloud nav)
     3. Page content — unchanged

   Usage: <script src="wf-nav.js"></script> before </body>
   Requires: wireframe.css (for .wf-ctx-bar, .wf-nav-* classes)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Sitemap Data ────────────────────────────────────────────────
  // Each section maps to a persona / portal area.
  // items[].children creates a collapsible sub-group in the drawer.
  var SECTIONS = [

    // ── SFDC ──────────────────────────────────────────────────────
    { id: 'grp-sfdc', label: 'SFDC', isGroup: true },
    {
      id: 'ae',
      label: 'AE',
      persona: 'ae',
      personaLabel: 'AE',
      personaName: '— Equinix',
      items: [
        {
          file: 'ae-opportunities', label: 'Opportunities',
          children: [
            { file: 'ae-ordering',     label: 'Create Order' },
            { file: 'ae-fulfillment',  label: 'Fulfillment' }
          ]
        }
      ]
    },
    {
      id: 'psm',
      label: 'PSM',
      persona: 'psm',
      personaLabel: 'PSM',
      personaName: 'Marcus Chen · Equinix',
      items: [
        { file: 'psm-executive-dashboard',    label: 'Executive Dashboard' },
        { file: 'psm-program-dashboard',      label: 'Program Dashboard' },
        { file: 'psm-partner-account-list',   label: 'Partner Account List' },
        { file: 'psm-partner-account-record', label: 'Partner Account Record' },
        { file: 'psm-health-scorecard',       label: 'Health Scorecard' },
        {
          file: 'psm-deal-registration', label: 'Deal Registration',
          children: [
            { file: 'psm-deal-review-detail', label: 'Deal Review Detail' },
            { file: 'psm-deal-reg-rules',     label: 'Deal Reg Rules' },
            { file: 'psm-opportunity-record', label: 'Opportunity Record' }
          ]
        },
        { file: 'psm-commission-processing', label: 'Commission Processing' },
        { file: 'psm-contact-training',      label: 'Contact Training' },
        { file: 'psm-sumtotal-monitor',      label: 'SumTotal Monitor' },
        {
          file: 'psm-mdf-management', label: 'MDF',
          children: [
            { file: 'psm-mdf-analytics', label: 'Analytics' }
          ]
        },
        {
          file: 'psm-partner-application', label: 'Partner Lifecycle',
          children: [
            { file: 'psm-partner-onboarding',    label: 'Onboarding' },
            { file: 'psm-partner-setup',         label: 'Setup' },
            { file: 'psm-onboarding-plan',       label: 'Onboarding Plan' },
            { file: 'psm-partner-qualification', label: 'Qualification' }
          ]
        },
        { file: 'psm-contracts',           label: 'Contracts' },
        { file: 'psm-joint-business-plan', label: 'Joint Business Plan' },
        { file: 'psm-reports-analytics',   label: 'Reports & Analytics' },
        { file: 'psm-qbr-minutes',         label: 'QBR Minutes' },
        { file: 'psm-pop-review',          label: 'PoP Review' },
        { file: 'psm-reimbursement',       label: 'Reimbursement' },
        { file: 'psm-program-admin',       label: 'Program Admin' },
        { file: 'psm-encourage-modal',     label: 'Encourage Modal' },
        { file: 'psm-escalation-brief',    label: 'Escalation Brief' }
      ]
    },
    {
      id: 'pam',
      label: 'PAM',
      persona: 'pam',
      personaLabel: 'PAM',
      personaName: 'J. Patterson · Equinix',
      items: [
        { file: 'pam-dashboard',          label: 'PAM Dashboard' },
        { file: 'pam-partner-portfolio',  label: 'Partner Portfolio' },
        { file: 'pam-partner-account',    label: 'Partner Account (PAM view)' },
        { file: 'pam-tier-management',    label: 'Tier Governance' },
        { file: 'pam-program-agreements', label: 'Program Agreements' }
      ]
    },

    // ── Partner Portal ────────────────────────────────────────────
    { id: 'grp-partner', label: 'Partner Portal', isGroup: true },
    {
      id: 'rep',
      label: 'Sales Rep',
      persona: 'rep',
      personaLabel: 'Sales Rep',
      personaName: 'Steve Rogers · CloudBridge Inc.',
      items: [
        {
          file: 'rep-deals-commission', label: 'Deals',
          children: [
            { file: 'rep-register-deal',     label: 'Register Deal' },
            { file: 'rep-pipeline',          label: 'Pipeline' },
            { file: 'rep-search-commission', label: 'Search Commission' },
            { file: 'rep-deal-expiring',     label: 'Deal Expiring' }
          ]
        },
        {
          file: 'rep-home', label: 'Home',
          children: [
            { file: 'rep-home',      label: 'Day N — Returning User' },
            { file: 'rep-home-day0', label: 'Day 0 — First Login' }
          ]
        },
        { file: 'rep-first-login', label: 'First Login' },
        { file: 'rep-profile',     label: 'My Profile' },
        {
          file: 'rep-my-training', label: 'Training',
          children: [
            { file: 'rep-course-catalog',  label: 'Course Catalog' },
            { file: 'rep-course-detail',   label: 'Course Detail' },
            { file: 'rep-search-training', label: 'Search Training' },
            { file: 'rep-certifications',  label: 'Certifications' }
          ]
        },
        { file: 'rep-marketing', label: 'Marketing' },
        { file: 'rep-support',   label: 'Support' },
        {
          file: 'rep-resources', label: 'Resources',
          children: [
            { file: 'rep-sales-tools', label: 'Sales Tools' }
          ]
        },
        {
          file: 'rep-notifications', label: 'Notifications',
          children: [
            { file: 'rep-notification-history',     label: 'History' },
            { file: 'rep-notification-preferences', label: 'Preferences' }
          ]
        },
        { file: 'rep-messages', label: 'Messages' },
        {
          file: 'rep-search-results', label: 'Search',
          children: [
            { file: 'rep-search-fabric', label: 'Fabric Search' }
          ]
        }
      ]
    },
    {
      id: 'pm',
      label: 'Portal Admin',
      persona: 'pm',
      personaLabel: 'Portal Admin',
      personaName: 'Jordan Reeves · CloudBridge Inc.',
      items: [
        {
          file: 'pm-home-dashboard', label: 'Home Dashboard',
          children: [
            { file: 'pm-home-dashboard', label: 'Day N — Returning Admin' },
            { file: 'pm-home-day0',      label: 'Day 0 — First Login' },
            { file: 'pm-admin-setup',    label: 'Admin Setup Workflow' }
          ]
        },
        { file: 'pm-first-login',    label: 'First Login' },
        { file: 'pm-profile',        label: 'My Profile' },
        { file: 'pm-deals-revenue',  label: 'Deals & Revenue' },
        { file: 'pm-opportunities',  label: 'Opportunities' },
        {
          file: 'pm-team-training', label: 'Team Training',
          children: [
            { file: 'pm-team-training-user', label: 'User Detail' },
            { file: 'pm-course-catalog',     label: 'Course Catalog' },
            { file: 'pm-cert-tracker',       label: 'Cert Tracker' }
          ]
        },
        { file: 'pm-mdf-request',     label: 'MDF Request' },
        { file: 'pm-mdf-comarketing', label: 'MDF Co-Marketing' },
        {
          file: 'pm-resources', label: 'Resources',
          children: [
            { file: 'pm-asset-library', label: 'Asset Library' },
            { file: 'pm-playbooks',     label: 'Playbooks' }
          ]
        },
        { file: 'pm-support-center',    label: 'Support Center' },
        { file: 'pm-org-health',        label: 'Org Health' },
        { file: 'pm-customer-health',   label: 'Customer Health' },
        { file: 'pm-deal-registration', label: 'Deal Registration' },
        { file: 'pm-pop-submission',    label: 'PoP Submission' },
        { file: 'pm-team-management',   label: 'Team Management' },
        { file: 'pm-role-permissions',  label: 'Role Permissions' },
        {
          file: 'pm-org-onboarding-start', label: 'Org Onboarding',
          children: [
            { file: 'pm-org-onboarding-company',   label: 'Company Info' },
            { file: 'pm-org-onboarding-tax',       label: 'Tax Info' },
            { file: 'pm-org-onboarding-team',      label: 'Team Setup' },
            { file: 'pm-org-onboarding-agreement', label: 'Agreement' },
            { file: 'pm-org-onboarding-complete',  label: 'Complete' }
          ]
        },
        {
          file: 'partner-user-request', label: 'Subsequent User Registration',
          children: [
            { file: 'partner-user-request',          label: 'Join Request (email check + admin)' },
            { file: 'onboarding-rep-approval-email', label: 'Rep Approval Email' }
          ]
        }
      ]
    },
    {
      id: 'onboarding',
      label: 'Partner Workflows',
      persona: null,
      personaName: null,
      items: [
        {
          file: 'onboarding-partner-type', label: 'Partner Org Registration',
          children: [
            { file: 'onboarding-partner-type',           label: 'Choose Relationship' },
            { file: 'onboarding-apply-referral',         label: 'Apply — Lead Referral' },
            { file: 'onboarding-apply-form',             label: 'Apply — Reseller' },
            { file: 'onboarding-apply-wizard',           label: 'Apply — Reseller (search variant)' },
            { file: 'onboarding-acceptance-email',       label: 'Acceptance Email' },
            { file: 'onboarding-agreement',              label: 'Agreement' },
            { file: 'onboarding-agreement-confirmation', label: 'Agreement Confirmed' },
            { file: 'onboarding-auth-setup',             label: 'Auth Setup' }
          ]
        },
        {
          file: 'onboarding-wizard', label: 'Partner Onboarding',
          children: [
            { file: 'onboarding-welcome',      label: 'Welcome' },
            { file: 'onboarding-confirmation', label: 'Confirmation' }
          ]
        }
      ]
    },

    // ── Customer Portal ───────────────────────────────────────────
    { id: 'grp-customer', label: 'Customer Portal', isGroup: true },
    {
      id: 'ecp',
      label: 'ECP',
      persona: 'euc',
      personaLabel: 'EUC',
      personaName: 'Maria Hill · Meridian Capital Group',
      items: [
        { file: 'ecp-dashboard',              label: 'Dashboard' },
        { file: 'ecp-services-orders',        label: 'Services & Orders' },
        { file: 'ecp-order-detail',           label: 'Order Detail' },
        { file: 'ecp-inventory',              label: 'Inventory' },
        { file: 'ecp-cases',                  label: 'Cases' },
        { file: 'ecp-support-new',            label: 'New Support Case' },
        { file: 'ecp-notifications',          label: 'Notifications' },
        { file: 'ecp-product-catalog',        label: 'Product Catalog' },
        { file: 'ecp-partner-dashboard',      label: 'Partner Dashboard' },
        { file: 'ecp-partner-account-detail', label: 'Partner Account Detail' }
      ]
    },

    // ── Reference (always last) ───────────────────────────────────
    {
      id: 'ref',
      label: 'Reference',
      persona: null,
      personaName: null,
      items: [
        { file: 'sitemap-pcp-v2',          label: 'Sitemap v2.4' },
        { file: 'wf-feedback',             label: '💬 Feedback Tracker' },
        { file: 'personas',                label: 'Personas' },
        { file: 'story-reference',         label: 'Story Reference' },
        { file: 'research-best-practices', label: 'Research & Best Practices' },
        { file: 'persona-cards',           label: 'Persona Cards' },
        { file: 'pc-dr-deal-type',         label: 'Deal Type Reference' }
      ]
    }
  ];

  // ── Lookup Helpers ───────────────────────────────────────────────

  function currentFile() {
    var p = window.location.pathname;
    return p.substring(p.lastIndexOf('/') + 1).replace(/\.html$/, '') || 'index';
  }

  function findPage(file) {
    for (var si = 0; si < SECTIONS.length; si++) {
      var section = SECTIONS[si];
      if (section.isGroup || !section.items) continue;
      for (var ii = 0; ii < section.items.length; ii++) {
        var item = section.items[ii];
        if (item.file === file) {
          return { section: section, item: item, parents: [] };
        }
        if (item.children) {
          for (var ci = 0; ci < item.children.length; ci++) {
            if (item.children[ci].file === file) {
              return { section: section, item: item.children[ci], parents: [item] };
            }
          }
        }
      }
    }
    return null;
  }

  // ── Breadcrumb HTML ──────────────────────────────────────────────

  function buildBreadcrumbs(file) {
    var found = findPage(file);
    var parts = [];

    if (file === 'sitemap-pcp-v2') {
      parts.push('<span class="wf-ctx-crumb-current">Sitemap</span>');
      return parts.join('');
    }

    if (found) {
      var section = found.section;
      var item    = found.item;
      var parents = found.parents;

      // Start directly with the section label — no "Sitemap" root
      parts.push('<span class="wf-ctx-crumb-section">' + section.label + '</span>');

      if (parents.length > 0) {
        parts.push('<span class="wf-ctx-crumb-sep">&#x203A;</span>');
        parts.push('<a href="' + parents[0].file + '.html" class="wf-ctx-crumb-link">' + parents[0].label + '</a>');
      }

      parts.push('<span class="wf-ctx-crumb-sep">&#x203A;</span>');
      parts.push('<span class="wf-ctx-crumb-current">' + item.label + '</span>');
    }

    return parts.join('');
  }

  // ── Flyout Drawer HTML ───────────────────────────────────────────

  function buildDrawerHTML(file) {
    var found = findPage(file);
    var activeSectionId = found ? found.section.id : null;
    var html = '';

    // Top shortcut: full sitemap
    html += '<a href="index.html" class="wf-nav-sitemap-link" aria-label="View full sitemap">';
    html += '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;flex-shrink:0" aria-hidden="true">';
    html += '<rect x="1" y="1" width="5" height="4" rx="1"/><rect x="10" y="1" width="5" height="4" rx="1"/>';
    html += '<rect x="1" y="11" width="5" height="4" rx="1"/><rect x="10" y="11" width="5" height="4" rx="1"/>';
    html += '<line x1="3.5" y1="5" x2="3.5" y2="11"/><line x1="12.5" y1="5" x2="12.5" y2="11"/>';
    html += '<line x1="3.5" y1="8" x2="12.5" y2="8"/>';
    html += '</svg>Full Sitemap</a>';

    for (var si = 0; si < SECTIONS.length; si++) {
      var sec = SECTIONS[si];

      // Group divider — non-interactive label between portal sections
      if (sec.isGroup) {
        html += '<div class="wf-nav-group-label">' + sec.label + '</div>';
        continue;
      }

      var isOpen = (sec.id === activeSectionId);
      var dotCls = sec.persona
        ? 'wf-nav-persona-dot wf-nav-persona-dot--' + sec.persona
        : 'wf-nav-persona-dot wf-nav-persona-dot--ref';

      html += '<div class="wf-nav-section' + (isOpen ? ' wf-nav-section--open' : '') + '">';

      // Section header button
      html += '<button class="wf-nav-section-hd" onclick="wfNavToggleSection(this)" aria-expanded="' + isOpen + '">';
      html += '<span class="' + dotCls + '" aria-hidden="true"></span>';
      html += '<span class="wf-nav-section-hd-label">' + sec.label + '</span>';
      html += '<svg class="wf-nav-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';
      html += '</button>';

      // Item list
      html += '<ul class="wf-nav-section-body">';

      for (var ii = 0; ii < sec.items.length; ii++) {
        var item = sec.items[ii];
        var isCurrent    = (item.file === file);
        var hasChildren  = !!(item.children && item.children.length > 0);
        var childActive  = hasChildren && item.children.some(function (c) { return c.file === file; });
        var groupOpen    = childActive;

        if (hasChildren) {
          html += '<li class="wf-nav-group' + (groupOpen ? ' wf-nav-group--open' : '') + '">';
          html += '<div class="wf-nav-group-hd">';
          html += '<a href="' + item.file + '.html" class="wf-nav-item' + (isCurrent ? ' wf-nav-item--current' : '') + '">' + item.label + '</a>';
          html += '<button class="wf-nav-expand" onclick="wfNavToggleGroup(this)" aria-expanded="' + groupOpen + '" aria-label="Toggle ' + item.label + ' sub-pages">';
          html += '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>';
          html += '</button>';
          html += '</div>';
          html += '<ul class="wf-nav-sub">';
          for (var ci = 0; ci < item.children.length; ci++) {
            var child    = item.children[ci];
            var childCur = (child.file === file);
            html += '<li><a href="' + child.file + '.html" class="wf-nav-subitem' + (childCur ? ' wf-nav-item--current' : '') + '">' + child.label + '</a></li>';
          }
          html += '</ul>';
          html += '</li>';
        } else {
          html += '<li><a href="' + item.file + '.html" class="wf-nav-item' + (isCurrent ? ' wf-nav-item--current' : '') + '">' + item.label + '</a></li>';
        }
      }

      html += '</ul>';
      html += '</div>'; // .wf-nav-section
    }

    return html;
  }

  // ── DOM Injection ────────────────────────────────────────────────

  function init() {
    var file = currentFile();
    var body = document.body;

    // 1. Find current page's section for persona chip
    var found   = findPage(file);
    var section = found ? found.section : null;

    // 2. Build persona chip — spelled out from SECTIONS data, lives on the RIGHT
    //    Format: [dot] Proto-role — Person name · Company
    //    e.g.  ● AE — Steve Rogers · CloudBridge Inc.
    var personaChip = '';
    if (section && section.persona && section.personaName) {
      var roleLabel = section.personaLabel || section.label;
      personaChip =
        '<span class="wf-ctx-persona-chip wf-ctx-persona-chip--' + section.persona + '">' +
          '<span class="wf-ctx-persona-chip-dot" aria-hidden="true"></span>' +
          '<span class="wf-ctx-persona-chip-role">' + roleLabel + '</span>' +
          '<span class="wf-ctx-persona-chip-sep" aria-hidden="true"> — </span>' +
          '<span class="wf-ctx-persona-chip-name">' + section.personaName + '</span>' +
        '</span>';
    }

    // 3. Get or create the context bar element
    var ctxBar = document.querySelector('.page-context-bar');
    if (!ctxBar) {
      ctxBar = document.createElement('div');
    }

    // 4. Build Feedback button
    var feedbackBtn =
      '<button class="wf-ctx-feedback-btn" ' +
      'onclick="wfFbOpen();" ' +
      'aria-label="Open design notes and feedback">&#x1F4AC; Feedback</button>';

    // 4b. Build Notes button (calls existing toggleSpec() on the page if present)
    var notesBtn =
      '<button class="wf-ctx-notes-btn" ' +
      'onclick="if(typeof toggleSpec===\'function\')toggleSpec();" ' +
      'aria-label="Toggle wireframe notes">&#128203; Design Notes</button>';

    // 4c. Build Copy deep-link button
    var copyBtn =
      '<button class="wf-ctx-copy-btn" id="wf-copy-btn" ' +
      'onclick="wfCopyDeepLink()" ' +
      'title="Copy deep link to this page/step" ' +
      'aria-label="Copy deep link">' +
        '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
          '<path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4"/>' +
          '<path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12"/>' +
        '</svg>' +
      '</button>';

    // 5. Rebuild the context bar
    //    Left:  hamburger · breadcrumbs
    //    Right: persona chip · copy link · Feedback button · Design Notes button
    ctxBar.className = 'page-context-bar wf-ctx-bar';
    ctxBar.innerHTML =
      '<div class="wf-ctx-inner">' +
        '<div class="wf-ctx-left">' +
          '<button class="wf-ctx-hamburger" id="wf-nav-btn" ' +
          'onclick="wfNavOpen()" aria-label="Open wireframe navigation" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
          '<nav class="wf-ctx-breadcrumbs" aria-label="Wireframe breadcrumb">' +
            buildBreadcrumbs(file) +
          '</nav>' +
        '</div>' +
        '<div class="wf-ctx-right">' +
          personaChip +
          copyBtn +
          notesBtn +
          feedbackBtn +
        '</div>' +
      '</div>';

    // 6. Move context bar to be the very first child of body
    //    (ensures: context bar → app bar → page content)
    body.insertBefore(ctxBar, body.firstChild);

    // 7. Remove any remaining standalone persona badges (now replaced by chip)
    var oldBadges = document.querySelectorAll('.persona-badge');
    for (var bi = 0; bi < oldBadges.length; bi++) {
      if (!ctxBar.contains(oldBadges[bi])) {
        oldBadges[bi].remove();
      }
    }

    // 8. Hide old fixed spec-tab-anchor (Notes moved into context bar)
    var tabAnchor = document.querySelector('.spec-tab-anchor');
    if (tabAnchor) {
      tabAnchor.style.display = 'none';
      tabAnchor.setAttribute('aria-hidden', 'true');
    }

    // 9. Inject flyout overlay
    var overlay = document.createElement('div');
    overlay.className  = 'wf-nav-overlay';
    overlay.id         = 'wf-nav-overlay';
    overlay.setAttribute('onclick', 'wfNavClose()');
    overlay.setAttribute('aria-hidden', 'true');
    body.appendChild(overlay);

    // 10. Inject flyout drawer
    var drawer = document.createElement('nav');
    drawer.className = 'wf-nav-drawer';
    drawer.id        = 'wf-nav-drawer';
    drawer.setAttribute('aria-label', 'Wireframe site navigation');
    drawer.innerHTML =
      '<div class="wf-nav-drawer-hd">' +
        '<div>' +
          '<div class="wf-nav-drawer-title">PCP Wireframes</div>' +
          '<div class="wf-nav-drawer-subtitle">95 pages &middot; not final design</div>' +
        '</div>' +
        '<button class="wf-nav-drawer-close" onclick="wfNavClose()" aria-label="Close navigation">' +
          '&#x2715;' +
        '</button>' +
      '</div>' +
      '<div class="wf-nav-drawer-body">' +
        buildDrawerHTML(file) +
      '</div>';
    body.appendChild(drawer);

    // 11. After drawer is in DOM, scroll the active item into view
    setTimeout(function () {
      var active = drawer.querySelector('.wf-nav-item--current, .wf-nav-subitem.wf-nav-item--current');
      if (active) { active.scrollIntoView({ block: 'nearest' }); }
    }, 50);

    // 12. Inject feedback modal (lazy — creates DOM now, opens on button click)
    injectFeedbackModal(file);
  }

  // ── Deep-link copy ───────────────────────────────────────────────

  window.wfCopyDeepLink = function () {
    var url = window.location.href;
    var btn = document.getElementById('wf-copy-btn');
    navigator.clipboard.writeText(url).then(function () {
      if (!btn) return;
      btn.classList.add('copied');
      btn.title = 'Copied!';
      btn.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
          '<polyline points="2 9 6 13 14 4"/>' +
        '</svg>';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.title = 'Copy deep link to this page/step';
        btn.innerHTML =
          '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
            '<path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4"/>' +
            '<path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12"/>' +
          '</svg>';
      }, 1500);
    });
  };

  // ── Global Controls (called from onclick attributes) ─────────────

  window.wfNavOpen = function () {
    var overlay = document.getElementById('wf-nav-overlay');
    var drawer  = document.getElementById('wf-nav-drawer');
    var btn     = document.getElementById('wf-nav-btn');
    if (overlay) overlay.classList.add('open');
    if (drawer)  drawer.classList.add('open');
    if (btn)     btn.setAttribute('aria-expanded', 'true');
    // Smooth-scroll active item into view after transition
    setTimeout(function () {
      var active = document.querySelector('#wf-nav-drawer .wf-nav-item--current');
      if (active) { active.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    }, 220);
  };

  window.wfNavClose = function () {
    var overlay = document.getElementById('wf-nav-overlay');
    var drawer  = document.getElementById('wf-nav-drawer');
    var btn     = document.getElementById('wf-nav-btn');
    if (overlay) overlay.classList.remove('open');
    if (drawer)  drawer.classList.remove('open');
    if (btn)     btn.setAttribute('aria-expanded', 'false');
  };

  // Keyboard: Escape — review → main → close panel → close nav drawer
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var fbOverlay = document.getElementById('wf-fb-overlay');
      if (fbOverlay && fbOverlay.classList.contains('open')) {
        if (_wfFbInReview) {
          window.wfFbExitReview(); // back out of review without closing panel
        } else {
          window.wfFbClose();
        }
      } else {
        window.wfNavClose();
      }
    }
  });

  window.wfNavToggleSection = function (btn) {
    var section = btn.closest('.wf-nav-section');
    var isOpen  = section.classList.contains('wf-nav-section--open');
    section.classList.toggle('wf-nav-section--open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  };

  window.wfNavToggleGroup = function (btn) {
    var group  = btn.closest('.wf-nav-group');
    var isOpen = group.classList.contains('wf-nav-group--open');
    group.classList.toggle('wf-nav-group--open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  };

  // ── In-Page Feedback Modal ───────────────────────────────────────

  var _wfFbFile        = '';   // current page slug
  var _wfFbQueueCache  = [];   // last rendered items (for detail view lookup)
  var _wfFbDetailSrc   = null; // 'main' | 'review' — where detail was opened from
  var _wfFbDetailId    = null; // id of item currently in detail view
  var _wfFbScreenshot = null; // base64 image for pending feedback item
  var _wfFbTransTxt   = '';   // raw transcript text
  var WF_FB_KEY       = 'pcp-wf-feedback-v1';
  var _wfFbDirHandle    = null; // FileSystemDirectoryHandle when folder is connected
  var _wfFbPendingHandle= null; // handle restored from IDB but awaiting permission re-grant
  var _wfFbInReview   = false; // true when review (all-pages) view is active
  // Convert page slug to a human-readable label
  function pageSlugToLabel(slug) {
    for (var si = 0; si < SECTIONS.length; si++) {
      var sec = SECTIONS[si];
      if (sec.isGroup || !sec.items) continue;   // skip portal-group dividers
      for (var ii = 0; ii < sec.items.length; ii++) {
        var item = sec.items[ii];
        if (item.file === slug) { return item.label; }
        if (item.children) {
          for (var ci = 0; ci < item.children.length; ci++) {
            if (item.children[ci].file === slug) { return item.children[ci].label; }
          }
        }
      }
    }
    return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  // localStorage helpers
  function wfFbLoadItems() {
    try { return JSON.parse(localStorage.getItem(WF_FB_KEY) || '[]'); } catch (e) { return []; }
  }
  function wfFbSaveItems(items) {
    try { localStorage.setItem(WF_FB_KEY, JSON.stringify(items)); } catch (e) {}
  }
  // ── Sequential ID counter ─────────────────────────────────────────
  // Folder mode: reads/writes _seq.json at the folder root.
  // localStorage fallback: increments 'wf-fb-seq' key.
  async function wfFbNextId() {
    if (_wfFbDirHandle) {
      try {
        var next = 1;
        try {
          var sh = await _wfFbDirHandle.getFileHandle('_seq.json', { create: false });
          var sd = JSON.parse(await (await sh.getFile()).text());
          if (sd && typeof sd.next === 'number') { next = sd.next; }
        } catch (e) { /* file doesn't exist yet — start at 1 */ }
        var wh = await _wfFbDirHandle.getFileHandle('_seq.json', { create: true });
        var wr = await wh.createWritable();
        await wr.write(JSON.stringify({ next: next + 1 }));
        await wr.close();
        return next;
      } catch (e) { /* fall through */ }
    }
    var n = parseInt(localStorage.getItem('wf-fb-seq') || '0', 10) + 1;
    localStorage.setItem('wf-fb-seq', n);
    return n;
  }

  function wfFbAddItem(item) {
    var items = wfFbLoadItems(); items.unshift(item); wfFbSaveItems(items);
    if (_wfFbDirHandle) { wfFbWriteFile(item); } // async, fire-and-forget
  }
  // Toast notification
  function wfFbToast(msg) {
    var t = document.getElementById('wf-fb-toast');
    if (t) {
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(function () { t.classList.remove('show'); }, 2500);
    }
  }

  // Build and inject the feedback modal DOM (called once from init)
  function injectFeedbackModal(file) {
    if (document.getElementById('wf-fb-overlay')) { return; }
    _wfFbFile = file;
    var pageLabel = pageSlugToLabel(file);

    var typeDefs = [
      { val: 'question',    label: 'Question',    icon: '❓' },
      { val: 'issue',       label: 'Issue',        icon: '🔴' },
      { val: 'decision',    label: 'Decision',     icon: '☑️' },
      { val: 'suggestion',  label: 'Suggestion',   icon: '💡' },
      { val: 'stakeholder', label: 'Stakeholder',  icon: '👥' },
      { val: 'approved',    label: 'Approved',     icon: '✅' }
    ];

    var typePillsHTML = typeDefs.map(function (t) {
      return '<label class="wf-fb-type-pill">' +
        '<input type="radio" name="wf-fb-type" value="' + t.val + '"' +
        (t.val === 'question' ? ' checked' : '') +
        ' onchange="wfFbTypeChange(this)">' +
        '<span>' + t.icon + '&nbsp;' + t.label + '</span>' +
        '</label>';
    }).join('');

    var modalHTML =
      '<div class="wf-fb-overlay" id="wf-fb-overlay" aria-hidden="true" onclick="wfFbOverlayClick(event)">' +
        '<div class="wf-fb-panel-wrap" role="dialog" aria-modal="true" aria-labelledby="wf-fb-modal-title">' +

          // ── Header ──────────────────────────────────────────────
          '<div class="wf-fb-hd">' +
            // Main-mode title (hidden when in-review)
            '<div class="wf-fb-hd-main">' +
              '<div class="wf-fb-hd-left">' +
                '<span class="wf-fb-hd-title" id="wf-fb-modal-title">Design Notes &amp; Feedback</span>' +
                '<span class="wf-fb-page-badge" aria-label="Current page">' + pageLabel + '</span>' +
              '</div>' +
            '</div>' +
            // Review-mode title (visible when in-review)
            '<div class="wf-fb-hd-back">' +
              '<button class="wf-fb-back-btn" onclick="wfFbExitReview()" aria-label="Back to notes">&#x2039; Back</button>' +
              '<span class="wf-fb-hd-title">All Feedback</span>' +
            '</div>' +
            // Detail-mode title (visible when in-detail)
            '<div class="wf-fb-hd-detail">' +
              '<button class="wf-fb-back-btn" onclick="wfFbExitDetail()" aria-label="Back">&#x2039; Back</button>' +
              '<span class="wf-fb-hd-title" id="wf-fb-detail-title">Feedback</span>' +
            '</div>' +
            '<button class="wf-fb-hd-close" onclick="wfFbClose()" aria-label="Close feedback panel">&#x2715;</button>' +
          '</div>' +

          // ── Panel slider: holds main view + review view side by side ──
          '<div class="wf-fb-panel-slider" id="wf-fb-panel-slider">' +

          // ── Main view ────────────────────────────────────────────
          '<div class="wf-fb-view wf-fb-view--main" id="wf-fb-view-main">' +

          // ── Tabs ────────────────────────────────────────────────
          '<div class="wf-fb-tabs" role="tablist">' +
            '<button class="wf-fb-tab wf-fb-tab--active" id="wf-fb-tab-feedback"' +
              ' onclick="wfFbSwitchTab(\'feedback\')" role="tab" aria-selected="true"' +
              ' aria-controls="wf-fb-body-feedback">&#x1F4AC; Feedback</button>' +
            '<button class="wf-fb-tab" id="wf-fb-tab-transcript"' +
              ' onclick="wfFbSwitchTab(\'transcript\')" role="tab" aria-selected="false"' +
              ' aria-controls="wf-fb-body-transcript">&#x1F4C4; Transcript</button>' +
          '</div>' +

          // ── Feedback Body ────────────────────────────────────────
          '<div class="wf-fb-body" id="wf-fb-body-feedback" role="tabpanel" aria-labelledby="wf-fb-tab-feedback">' +
            '<form id="wf-fb-form" onsubmit="wfFbSubmit(event)" novalidate>' +

              '<div class="wf-fb-field">' +
                '<div class="wf-fb-label">Type</div>' +
                '<div class="wf-fb-type-pills">' + typePillsHTML + '</div>' +
              '</div>' +

              '<div class="wf-fb-field" id="wf-fb-sev-row" style="display:none">' +
                '<label class="wf-fb-label" for="wf-fb-sev">Severity</label>' +
                '<select id="wf-fb-sev" class="wf-fb-select">' +
                  '<option value="">— select —</option>' +
                  '<option value="critical">🔴 Critical</option>' +
                  '<option value="high">🟠 High</option>' +
                  '<option value="medium">🟡 Medium</option>' +
                  '<option value="low">🟢 Low</option>' +
                '</select>' +
              '</div>' +

              '<div class="wf-fb-field">' +
                '<label class="wf-fb-label" for="wf-fb-desc">Description</label>' +
                '<textarea id="wf-fb-desc" class="wf-fb-textarea" rows="4"' +
                  ' placeholder="Describe the note, issue, or decision…" required></textarea>' +
              '</div>' +

              '<div class="wf-fb-field">' +
                '<div class="wf-fb-label">Screenshot <span class="wf-fb-optional">(optional)</span></div>' +
                '<div class="wf-fb-drop" id="wf-fb-img-drop"' +
                  ' ondragover="wfFbDragOver(event)" ondrop="wfFbDropImage(event)"' +
                  ' onclick="document.getElementById(\'wf-fb-img-input\').click()"' +
                  ' role="button" tabindex="0" aria-label="Upload screenshot">' +
                  '<span id="wf-fb-img-drop-text" class="wf-fb-drop-hint">Drop or click to upload</span>' +
                  '<img id="wf-fb-img-preview" class="wf-fb-img-preview" alt="Screenshot preview" style="display:none">' +
                '</div>' +
                '<div class="wf-fb-img-actions">' +
                  '<button type="button" class="wf-fb-paste-btn" onclick="wfFbPasteClipboard()" title="Click then press \u2318V / Ctrl+V">\u2318V Paste screenshot</button>' +
                  '<button type="button" class="wf-fb-clear-img-btn" id="wf-fb-clear-img-btn"' +
                    ' onclick="wfFbClearImage()" aria-label="Remove screenshot" style="display:none">\u00d7 Remove</button>' +
                '</div>' +
                '<input type="file" id="wf-fb-img-input" accept="image/*"' +
                  ' style="display:none" onchange="wfFbImageFile(event)">' +
              '</div>' +

              '<div class="wf-fb-actions">' +
                '<button type="submit" class="wf-fb-submit">Save Note</button>' +
                '<a href="feedback-review.html" target="_blank" class="wf-fb-view-all">Review ↗</a>' +
              '</div>' +

            '</form>' +

            // ── Inline Queue ─────────────────────────────────────────
            '<div class="wf-fb-queue" id="wf-fb-queue">' +
              '<div class="wf-fb-queue-hd">' +
                '<span class="wf-fb-queue-title">On this page</span>' +
                '<button class="wf-fb-review-btn" id="wf-fb-review-btn"' +
                  ' onclick="wfFbEnterReview()"' +
                  ' title="See all feedback across all pages">↻ Review</button>' +
              '</div>' +
              '<div id="wf-fb-queue-list"></div>' +
              '<div class="wf-fb-queue-footer" id="wf-fb-queue-footer"></div>' +
            '</div>' +

          '</div>' +

          // ── Transcript Body ──────────────────────────────────────
          '<div class="wf-fb-body wf-fb-body--hidden" id="wf-fb-body-transcript" role="tabpanel"' +
            ' aria-labelledby="wf-fb-tab-transcript">' +

            '<div class="wf-fb-field">' +
              '<label class="wf-fb-label" for="wf-fb-session-title">Session title</label>' +
              '<input type="text" id="wf-fb-session-title" class="wf-fb-input"' +
                ' placeholder="e.g. Stakeholder Review 2026-02-20">' +
            '</div>' +

            '<div class="wf-fb-field">' +
              '<div class="wf-fb-label">Transcript file <span class="wf-fb-optional">(.txt .vtt .srt .md)</span></div>' +
              '<div class="wf-fb-drop" id="wf-fb-tr-drop"' +
                ' ondragover="wfFbDragOver(event)" ondrop="wfFbDropTranscript(event)"' +
                ' onclick="document.getElementById(\'wf-fb-tr-input\').click()"' +
                ' role="button" tabindex="0" aria-label="Upload transcript file">' +
                '<span id="wf-fb-tr-drop-text" class="wf-fb-drop-hint">Drop Zoom / Teams AI transcript here or click to upload</span>' +
              '</div>' +
              '<input type="file" id="wf-fb-tr-input" accept=".txt,.vtt,.srt,.md,.docx"' +
                ' style="display:none" onchange="wfFbTranscriptFile(event)">' +
            '</div>' +

            '<div class="wf-fb-field" id="wf-fb-tr-preview-row" style="display:none">' +
              '<label class="wf-fb-label" for="wf-fb-tr-text">Preview &amp; edit</label>' +
              '<textarea id="wf-fb-tr-text" class="wf-fb-textarea wf-fb-tr-text" rows="9"' +
                ' placeholder="Transcript content…"></textarea>' +
            '</div>' +

            '<div class="wf-fb-actions">' +
              '<button type="button" class="wf-fb-submit" id="wf-fb-tr-save"' +
                ' onclick="wfFbTranscriptSave()" disabled>Save Transcript</button>' +
              '<a href="feedback-review.html" target="_blank" class="wf-fb-view-all">Review ↗</a>' +
            '</div>' +

          '</div>' +

          '</div>' + // .wf-fb-view--main

          // ── Review view (all pages, push-nav style) ──────────────
          '<div class="wf-fb-view wf-fb-view--review" id="wf-fb-view-review" aria-hidden="true">' +
            '<div class="wf-fb-review-toolbar">' +
              '<button type="button" class="wf-fb-copy-batch-btn" onclick="wfFbCopyBatchForLLM()" title="Copy all feedback formatted for an LLM prompt">Copy all for LLM</button>' +
            '</div>' +
            '<div id="wf-fb-review-list" class="wf-fb-review-list"></div>' +
          '</div>' +

          // ── Detail view (single item, push-nav style) ─────────────
          '<div class="wf-fb-view wf-fb-view--detail" id="wf-fb-view-detail" aria-hidden="true">' +
            '<div id="wf-fb-detail-body" class="wf-fb-detail-body"></div>' +
          '</div>' +

        '</div>' + // .wf-fb-panel-slider

        '</div>' + // .wf-fb-panel-wrap
        '<div class="wf-fb-toast" id="wf-fb-toast" aria-live="polite" aria-atomic="true"></div>' +
      '</div>'; // .wf-fb-overlay

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Try to silently restore the folder handle from IndexedDB.
    // If permission is still active (same session), this is fully automatic.
    // If permission lapsed, it sets _wfFbPendingHandle and shows "Reconnect" in footer.
    wfFbAutoRestore();
  }

  // ── Feedback Modal Controls ──────────────────────────────────────

  window.wfFbOpen = function () {
    var overlay = document.getElementById('wf-fb-overlay');
    if (!overlay) { return; }
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.classList.add('wf-fb-open');
    wfFbRenderQueue();
    setTimeout(function () {
      var desc = document.getElementById('wf-fb-desc');
      if (desc) { desc.focus(); }
    }, 150);
  };

  window.wfFbClose = function () {
    var overlay = document.getElementById('wf-fb-overlay');
    if (!overlay) { return; }
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.classList.remove('wf-fb-open');
    // Reset review state so panel opens fresh next time
    if (_wfFbInReview) {
      _wfFbInReview = false;
      var wrap = document.querySelector('.wf-fb-panel-wrap');
      if (wrap) { wrap.classList.remove('in-review'); }
    }
  };

  window.wfFbOverlayClick = function (e) {
    if (e.target && e.target.id === 'wf-fb-overlay') { window.wfFbClose(); }
  };

  window.wfFbSwitchTab = function (tab) {
    ['feedback', 'transcript'].forEach(function (t) {
      var tabBtn   = document.getElementById('wf-fb-tab-' + t);
      var bodyEl   = document.getElementById('wf-fb-body-' + t);
      var isActive = (t === tab);
      if (tabBtn)  { tabBtn.classList.toggle('wf-fb-tab--active', isActive); tabBtn.setAttribute('aria-selected', String(isActive)); }
      if (bodyEl)  { bodyEl.classList.toggle('wf-fb-body--hidden', !isActive); }
    });
  };

  window.wfFbTypeChange = function (radio) {
    var sevRow = document.getElementById('wf-fb-sev-row');
    if (sevRow) { sevRow.style.display = (radio.value === 'issue') ? '' : 'none'; }
  };

  // ── Image handling ───────────────────────────────────────────────

  window.wfFbDragOver = function (e) { e.preventDefault(); };

  window.wfFbDropImage = function (e) {
    e.preventDefault();
    var f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) { wfFbReadImage(f); }
  };

  window.wfFbImageFile = function (e) {
    var f = e.target.files[0];
    if (f) { wfFbReadImage(f); }
  };

  function wfFbReadImage(f) {
    var reader = new FileReader();
    reader.onload = function (ev) {
      _wfFbScreenshot = ev.target.result;
      var preview  = document.getElementById('wf-fb-img-preview');
      var dropHint = document.getElementById('wf-fb-img-drop-text');
      var clearBtn = document.getElementById('wf-fb-clear-img-btn');
      if (preview)  { preview.src = _wfFbScreenshot; preview.style.display = ''; }
      if (dropHint) { dropHint.style.display = 'none'; }
      if (clearBtn) { clearBtn.style.display = ''; }
    };
    reader.readAsDataURL(f);
  }

  // Clear a pasted or uploaded screenshot before saving.
  window.wfFbClearImage = function () {
    _wfFbScreenshot = null;
    var preview   = document.getElementById('wf-fb-img-preview');
    var dropHint  = document.getElementById('wf-fb-img-drop-text');
    var clearBtn  = document.getElementById('wf-fb-clear-img-btn');
    var fileInput = document.getElementById('wf-fb-img-input');
    if (preview)   { preview.style.display = 'none'; preview.src = ''; }
    if (dropHint)  { dropHint.style.display = ''; }
    if (clearBtn)  { clearBtn.style.display = 'none'; }
    if (fileInput) { fileInput.value = ''; } // allow re-selecting the same file
  };

  // ── Feedback form submit ─────────────────────────────────────────

  window.wfFbSubmit = async function (e) {
    e.preventDefault();
    var typeEl = document.querySelector('input[name="wf-fb-type"]:checked');
    var descEl = document.getElementById('wf-fb-desc');
    var sevEl  = document.getElementById('wf-fb-sev');

    var type = typeEl ? typeEl.value.trim() : 'question';
    var desc = descEl ? descEl.value.trim() : '';
    var sev  = (type === 'issue' && sevEl) ? sevEl.value : '';

    if (!desc) { if (descEl) { descEl.focus(); } return; }

    // Auto-connect on first save — picker fires as part of this user gesture
    if (!_wfFbDirHandle && window.showDirectoryPicker) {
      try {
        _wfFbDirHandle     = await window.showDirectoryPicker({ id: 'pcp-feedback', mode: 'readwrite' });
        _wfFbPendingHandle = null;
        wfFbSaveDirHandle(_wfFbDirHandle);
        wfFbToast('Folder connected \u2713 — notes will save as JSON files');
      } catch (e) { /* cancelled — continue saving to localStorage only */ }
    }

    var newId = await wfFbNextId();
    wfFbAddItem({
      id:         newId,
      page:       _wfFbFile,
      type:       type,
      severity:   sev || null,
      desc:       desc,
      status:     'open',
      screenshot: _wfFbScreenshot || null,
      createdAt:  new Date().toISOString()
    });

    wfFbToast('Note saved ✓');

    // Reset form state
    if (descEl)  { descEl.value = ''; }
    if (sevEl)   { sevEl.value  = ''; }
    _wfFbScreenshot = null;
    var preview   = document.getElementById('wf-fb-img-preview');
    var dropHint  = document.getElementById('wf-fb-img-drop-text');
    var clearBtn  = document.getElementById('wf-fb-clear-img-btn');
    var fileInput = document.getElementById('wf-fb-img-input');
    if (preview)   { preview.style.display = 'none'; preview.src = ''; }
    if (dropHint)  { dropHint.style.display = ''; }
    if (clearBtn)  { clearBtn.style.display = 'none'; }
    if (fileInput) { fileInput.value = ''; }
    var defaultType = document.querySelector('input[name="wf-fb-type"][value="question"]');
    if (defaultType) { defaultType.checked = true; }
    var sevRow = document.getElementById('wf-fb-sev-row');
    if (sevRow) { sevRow.style.display = 'none'; }

    // Stay open — refresh queue so user can see the captured item
    wfFbRenderQueue();
  };

  // ── Transcript handling ──────────────────────────────────────────

  window.wfFbDropTranscript = function (e) {
    e.preventDefault();
    var f = e.dataTransfer.files[0];
    if (f) { wfFbReadTranscript(f); }
  };

  window.wfFbTranscriptFile = function (e) {
    var f = e.target.files[0];
    if (f) { wfFbReadTranscript(f); }
  };

  function wfFbReadTranscript(f) {
    var reader = new FileReader();
    reader.onload = function (ev) {
      _wfFbTransTxt = ev.target.result;
      var textEl     = document.getElementById('wf-fb-tr-text');
      var previewRow = document.getElementById('wf-fb-tr-preview-row');
      var dropText   = document.getElementById('wf-fb-tr-drop-text');
      var saveBtn    = document.getElementById('wf-fb-tr-save');
      var titleEl    = document.getElementById('wf-fb-session-title');
      if (textEl)     { textEl.value = _wfFbTransTxt; }
      if (previewRow) { previewRow.style.display = ''; }
      if (dropText)   { dropText.textContent = '\u2713 ' + f.name; }
      if (saveBtn)    { saveBtn.disabled = false; }
      // Auto-suggest title from filename if field is empty
      if (titleEl && !titleEl.value) {
        titleEl.value = f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      }
    };
    reader.readAsText(f);
  }

  window.wfFbTranscriptSave = async function () {
    var titleEl = document.getElementById('wf-fb-session-title');
    var textEl  = document.getElementById('wf-fb-tr-text');
    var text    = textEl  ? textEl.value.trim()  : _wfFbTransTxt;
    var title   = titleEl ? titleEl.value.trim() : '';

    if (!text) { return; }

    var newId = await wfFbNextId();
    wfFbAddItem({
      id:           newId,
      page:         _wfFbFile,
      type:         'transcript',
      severity:     null,
      desc:         text,
      sessionTitle: title || 'Transcript',
      status:       'open',
      screenshot:   null,
      createdAt:    new Date().toISOString()
    });

    wfFbToast('Transcript saved \u2713');
    setTimeout(window.wfFbClose, 700);
  };

  // ── Feedback Queue ───────────────────────────────────────────────

  var _typeIcons = { question: '❓', issue: '🔴', decision: '☑️', suggestion: '💡', stakeholder: '👥', approved: '✅', transcript: '📄' };

  function wfFbQueueItemHTML(item) {
    var icon   = _typeIcons[item.type] || '💬';
    var isDone = item.status === 'done';
    var raw    = item.type === 'transcript' ? (item.sessionTitle || 'Transcript') : item.desc;
    var label  = raw.length > 72 ? raw.slice(0, 72) + '\u2026' : raw;
    // Escape HTML entities in label
    label = label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    var safeId = item.id.replace(/'/g, '');

    // Resolution row — only shown when done, lets user record how it was resolved
    var resolutionRow = '';
    if (isDone) {
      var resType = item.resolutionType || '';
      var resNote = (item.resolutionNote || '').replace(/"/g, '&quot;');
      resolutionRow =
        '<div class="wf-fb-resolution">' +
          '<select class="wf-fb-res-type" aria-label="Resolution type"' +
            ' onchange="wfFbSaveResolution(\'' + safeId + '\', this.value, null)">' +
            '<option value=""'          + (!resType                  ? ' selected' : '') + '>— how resolved —</option>' +
            '<option value="fixed"'    + (resType === 'fixed'    ? ' selected' : '') + '>Fixed</option>' +
            '<option value="wontdo"'   + (resType === 'wontdo'   ? ' selected' : '') + '>Won\'t do</option>' +
            '<option value="deferred"' + (resType === 'deferred' ? ' selected' : '') + '>Deferred</option>' +
            '<option value="noted"'    + (resType === 'noted'    ? ' selected' : '') + '>Noted</option>' +
          '</select>' +
          '<input class="wf-fb-res-note" type="text" placeholder="Add note…"' +
            ' value="' + resNote + '"' +
            ' onblur="wfFbSaveResolution(\'' + safeId + '\', null, this.value)"' +
            ' onkeydown="if(event.key===\'Enter\'){this.blur();}"' +
            ' aria-label="Resolution note">' +
        '</div>';
    }

    return '<div class="wf-fb-queue-item' + (isDone ? ' wf-fb-queue-item--done' : '') + '">' +
      '<label class="wf-fb-queue-check-label">' +
        '<input type="checkbox" class="wf-fb-queue-check"' +
          ' onchange="wfFbMarkDone(\'' + safeId + '\')"' +
          (isDone ? ' checked' : '') +
          ' aria-label="Mark as done">' +
      '</label>' +
      '<button type="button" class="wf-fb-queue-item-body" onclick="wfFbOpenDetail(\'' + safeId + '\')" title="View details">' +
        '<span class="wf-fb-queue-icon">' + icon + '</span>' +
        '<span class="wf-fb-queue-desc">' + label + '</span>' +
      '</button>' +
      resolutionRow +
    '</div>';
  }

  async function wfFbRenderQueue() {
    var listEl = document.getElementById('wf-fb-queue-list');
    if (!listEl) { return; }

    var pageItems;
    if (_wfFbDirHandle) {
      pageItems = await wfFbReadPageFiles(_wfFbFile);
    } else {
      var all = wfFbLoadItems();
      pageItems = all.filter(function (i) { return i.page === _wfFbFile; });
    }

    _wfFbQueueCache = pageItems || []; // cache for detail view lookup

    if (!pageItems || pageItems.length === 0) {
      listEl.innerHTML = '<div class="wf-fb-queue-empty">No notes for this page yet</div>';
      wfFbUpdateFolderStatus();
      return;
    }

    var openItems = pageItems.filter(function (i) { return i.status !== 'done'; });
    var doneItems = pageItems.filter(function (i) { return i.status === 'done'; });

    var html = '';
    if (openItems.length > 0) {
      html += '<div class="wf-fb-queue-section-label">Open</div>';
      for (var oi = 0; oi < openItems.length; oi++) { html += wfFbQueueItemHTML(openItems[oi]); }
    }
    if (doneItems.length > 0) {
      html += '<div class="wf-fb-queue-section-label">Done</div>';
      for (var di = 0; di < doneItems.length; di++) { html += wfFbQueueItemHTML(doneItems[di]); }
    }
    listEl.innerHTML = html;
    wfFbUpdateFolderStatus(); // update footer every time queue is rendered
  }

  window.wfFbMarkDone = async function (id) {
    var items     = wfFbLoadItems();
    var updated   = null;
    var oldStatus = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        oldStatus = items[i].status;
        items[i].status = (oldStatus === 'done') ? 'open' : 'done';
        if (items[i].status === 'done') {
          // Moving to resolved: stamp the time if not already set
          if (!items[i].resolvedAt) { items[i].resolvedAt = new Date().toISOString(); }
        } else {
          // Undoing — move back to feedback; clear resolution metadata
          delete items[i].resolvedAt;
          delete items[i].resolutionType;
          delete items[i].resolutionNote;
        }
        updated = items[i];
        break;
      }
    }
    if (!updated) { return; }
    wfFbSaveItems(items);
    if (_wfFbDirHandle) {
      // Move file: delete from old subfolder, write to new
      var oldSub = (oldStatus === 'done') ? 'resolved' : 'feedback';
      await wfFbDeleteFile(updated.id, updated.type, oldSub);
      await wfFbWriteFile(updated);
    }
    wfFbRenderQueue();
  };

  // Update resolution type and/or note on a done item (does not change status or move files).
  window.wfFbSaveResolution = async function (id, resType, resNote) {
    var items   = wfFbLoadItems();
    var updated = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        if (resType !== null && resType !== undefined) { items[i].resolutionType = resType; }
        if (resNote !== null && resNote !== undefined) { items[i].resolutionNote = resNote; }
        updated = items[i];
        break;
      }
    }
    if (!updated) { return; }
    wfFbSaveItems(items);
    if (_wfFbDirHandle) { await wfFbWriteFile(updated); } // overwrite file in resolved/
  };

  // ── Clipboard Paste ──────────────────────────────────────────────

  // Paste button: focus the drop zone so ⌘V triggers the global handler below
  window.wfFbPasteClipboard = function () {
    var drop = document.getElementById('wf-fb-img-drop');
    if (drop) { drop.focus(); }
    wfFbToast('Ready \u2014 press \u2318V / Ctrl+V to paste your screenshot');
  };

  // ── File System (folder-based storage) ──────────────────────────

  // Connect to a local folder via File System Access API.
  // All feedback items are written as JSON files in a flat structure:
  //   {folder}/feedback/{n}.json            — open items (n = sequential ID)
  //   {folder}/feedback/{n}.png             — optional screenshot(s) for item n
  //   {folder}/resolved/{id}--{type}.json  — done items
  // Each JSON contains a `page` field for per-page filtering.
  // Also called from the footer status area when the user clicks to change/connect folder.
  window.wfFbConnectFolder = async function () {
    if (!window.showDirectoryPicker) {
      wfFbToast('File System Access API not supported in this browser');
      return;
    }
    try {
      _wfFbDirHandle     = await window.showDirectoryPicker({ id: 'pcp-feedback', mode: 'readwrite' });
      _wfFbPendingHandle = null;
      wfFbSaveDirHandle(_wfFbDirHandle);
      wfFbToast('Folder connected \u2713 — notes will save as JSON files');
      wfFbRenderQueue();
    } catch (e) {
      // User cancelled picker — ignore
    }
  };

  // ↻ Manual refresh — re-reads from files (or localStorage) and updates queue.
  // Useful when impatient; also serves as "review" trigger.
  // ── Review (push-nav): show all-pages view ────────────────────────

  window.wfFbEnterReview = function () {
    _wfFbInReview = true;
    var wrap = document.getElementById('wf-fb-overlay') && document.querySelector('.wf-fb-panel-wrap');
    if (wrap) { wrap.classList.add('in-review'); }
    var revView = document.getElementById('wf-fb-view-review');
    if (revView) { revView.setAttribute('aria-hidden', 'false'); }
    wfFbRenderReview();
  };

  window.wfFbExitReview = function () {
    _wfFbInReview = false;
    var wrap = document.querySelector('.wf-fb-panel-wrap');
    if (wrap) { wrap.classList.remove('in-review'); }
    var revView = document.getElementById('wf-fb-view-review');
    if (revView) { revView.setAttribute('aria-hidden', 'true'); }
    wfFbRenderQueue(); // refresh queue now that we're back
  };

  // ── Detail view (single item) ─────────────────────────────────────

  var _typeNames = { question:'Question', issue:'Issue', decision:'Decision', suggestion:'Suggestion', stakeholder:'Stakeholder', approved:'Approved', transcript:'Transcript' };
  var _sevIcons  = { critical:'🔴', high:'🟠', medium:'🟡', low:'🟢' };

  window.wfFbOpenDetail = function (id) {
    var item = null;
    for (var ci = 0; ci < _wfFbQueueCache.length; ci++) {
      if (_wfFbQueueCache[ci].id === id) { item = _wfFbQueueCache[ci]; break; }
    }
    if (!item) { return; }

    _wfFbDetailSrc = _wfFbInReview ? 'review' : 'main';
    _wfFbDetailId  = id;

    var wrap    = document.querySelector('.wf-fb-panel-wrap');
    var detView = document.getElementById('wf-fb-view-detail');
    var detBody = document.getElementById('wf-fb-detail-body');
    if (!wrap || !detView || !detBody) { return; }

    var icon     = _typeIcons[item.type] || '💬';
    var typeName = _typeNames[item.type] || item.type;
    var safeId   = id.replace(/'/g, '');

    var sevHTML = '';
    if (item.severity) {
      var sevLabel = item.severity.charAt(0).toUpperCase() + item.severity.slice(1);
      sevHTML = ' <span class="wf-fb-detail-sev">' + (_sevIcons[item.severity] || '') + '&nbsp;' + wfFbEscHtml(sevLabel) + '</span>';
    }

    var ts = '';
    if (item.createdAt) {
      try { ts = new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (ex) {}
    }

    var screenshotHTML = item.screenshot
      ? '<img class="wf-fb-detail-screenshot" src="' + item.screenshot + '" alt="Screenshot">'
      : '';

    var existingRespHTML = '';
    if (item.responseText) {
      var respTs = '';
      if (item.responseAt) { try { respTs = new Date(item.responseAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); } catch (ex) {} }
      existingRespHTML = '<div class="wf-fb-detail-resp-existing">' + wfFbEscHtml(item.responseText) +
        (respTs ? '<span class="wf-fb-detail-resp-meta"> · ' + respTs + '</span>' : '') + '</div>';
    }

    var resInfoHTML = '';
    if (item.status === 'done' && item.resolutionType) {
      var resLabels = { fixed: 'Fixed', wontdo: "Won't do", deferred: 'Deferred', noted: 'Noted' };
      resInfoHTML = '<div class="wf-fb-detail-res-info">' +
        '<span class="wf-fb-detail-res-label">Resolved:</span> ' +
        wfFbEscHtml(resLabels[item.resolutionType] || item.resolutionType) +
        (item.resolutionNote ? ' · <em>' + wfFbEscHtml(item.resolutionNote) + '</em>' : '') +
        '</div>';
    }

    var respVal = ''; // textarea always starts empty; saved response shown in read-only block above

    detBody.innerHTML =
      '<div class="wf-fb-detail-meta">' +
        '<span class="wf-fb-detail-type-pill">' + icon + '&nbsp;' + wfFbEscHtml(typeName) + '</span>' +
        sevHTML +
        '<span class="wf-fb-detail-ts">' + wfFbEscHtml(ts) + '</span>' +
        (item.status === 'done' ? '<span class="wf-fb-detail-done-badge">Done</span>' : '') +
      '</div>' +
      '<p class="wf-fb-detail-desc">' + wfFbEscHtml(item.desc || item.sessionTitle || '') + '</p>' +
      screenshotHTML +
      resInfoHTML +
      '<div class="wf-fb-detail-resp-section">' +
        '<div class="wf-fb-detail-section-hd">Response</div>' +
        existingRespHTML +
        '<textarea class="wf-fb-detail-resp-input" id="wf-fb-detail-resp-input"' +
          ' placeholder="Write a response\u2026" rows="3">' + respVal + '</textarea>' +
        '<div class="wf-fb-detail-resp-actions">' +
          '<button class="wf-fb-detail-resp-save" type="button"' +
            ' onclick="wfFbSaveResponse(\'' + safeId + '\')">Save Response</button>' +
          '<button class="wf-fb-detail-resp-copy" type="button"' +
            ' onclick="wfFbCopyItemForLLM(\'' + safeId + '\')" title="Copy this item formatted for an LLM prompt">Copy for LLM</button>' +
        '</div>' +
      '</div>';

    var detTitle = document.getElementById('wf-fb-detail-title');
    if (detTitle) { detTitle.textContent = typeName; }

    wrap.classList.add('in-detail');
    detView.setAttribute('aria-hidden', 'false');
  };

  window.wfFbExitDetail = function () {
    _wfFbDetailId = null;
    var wrap    = document.querySelector('.wf-fb-panel-wrap');
    var detView = document.getElementById('wf-fb-view-detail');
    if (wrap)    { wrap.classList.remove('in-detail'); }
    if (detView) { detView.setAttribute('aria-hidden', 'true'); }
    // Stay in review if that's where we came from; otherwise queue is already rendered
    if (_wfFbDetailSrc !== 'review') { wfFbRenderQueue(); }
    _wfFbDetailSrc = null;
  };

  window.wfFbSaveResponse = async function (id) {
    var input = document.getElementById('wf-fb-detail-resp-input');
    var text  = input ? input.value.trim() : '';

    // Update in localStorage
    var items = wfFbLoadItems();
    var updated = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].responseText = text;
        items[i].responseAt   = new Date().toISOString();
        updated = items[i];
        break;
      }
    }

    // Also patch cache so re-open shows current text
    for (var ci = 0; ci < _wfFbQueueCache.length; ci++) {
      if (_wfFbQueueCache[ci].id === id) {
        _wfFbQueueCache[ci].responseText = text;
        _wfFbQueueCache[ci].responseAt   = updated ? updated.responseAt : new Date().toISOString();
        break;
      }
    }

    if (updated) {
      wfFbSaveItems(items);
      if (_wfFbDirHandle) { await wfFbWriteFile(updated); }
    }
    wfFbToast('Response saved \u2713');
    // Refresh detail view in-place to show the response text
    wfFbOpenDetail(id);
  };

  // ── LLM copy helpers ────────────────────────────────────────────────────────

  function wfFbFormatItemForLLM(item, num) {
    var typeNames = { question: 'Question', issue: 'Issue', decision: 'Decision', suggestion: 'Suggestion', stakeholder: 'Stakeholder note', approved: 'Approved' };
    var sevNames  = { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' };
    var ts = '';
    if (item.createdAt) { try { ts = new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); } catch (ex) {} }
    var lines = [];
    if (num !== null) { lines.push('### [' + num + '] ' + (pageSlugToLabel(item.page) || item.page || 'Unknown page')); }
    lines.push('Page: '     + (pageSlugToLabel(item.page) || item.page || 'Unknown'));
    lines.push('Type: '     + (typeNames[item.type] || item.type || 'Note') +
               ' | Severity: ' + (sevNames[item.severity] || item.severity || '—') +
               (ts ? ' | Submitted: ' + ts : ''));
    lines.push('Status: '  + (item.status === 'done' ? 'Resolved' : 'Open'));
    lines.push('');
    lines.push(item.desc || '(no description)');
    if (item.responseText) {
      lines.push('');
      lines.push('Response on file: ' + item.responseText);
      if (item.responseAt) { try { lines.push('Response date: ' + new Date(item.responseAt).toLocaleDateString()); } catch (ex) {} }
    }
    return lines.join('\n');
  }

  window.wfFbCopyItemForLLM = function (id) {
    var item = null;
    for (var ci = 0; ci < _wfFbQueueCache.length; ci++) {
      if (_wfFbQueueCache[ci].id === id) { item = _wfFbQueueCache[ci]; break; }
    }
    if (!item) { return; }
    navigator.clipboard.writeText(wfFbFormatItemForLLM(item, item.id))
      .then(function () { wfFbToast('Copied \u2713'); })
      .catch(function () { wfFbToast('Copy failed — try again'); });
  };

  window.wfFbCopyBatchForLLM = async function () {
    var allItems = [];
    if (_wfFbDirHandle) {
      var subs = ['feedback', 'resolved'];
      for (var si = 0; si < subs.length; si++) {
        try {
          var sub = await _wfFbDirHandle.getDirectoryHandle(subs[si], { create: false });
          for await (var ent of sub.values()) {
            if (ent.kind !== 'file' || !ent.name.endsWith('.json')) { continue; }
            try { allItems.push(JSON.parse(await (await ent.getFile()).text())); } catch (e) {}
          }
        } catch (e) {}
      }
    } else {
      allItems = wfFbLoadItems();
    }
    if (!allItems.length) { wfFbToast('No feedback to copy'); return; }

    // Sort by page then by date
    allItems.sort(function (a, b) {
      var pa = a.page || '', pb = b.page || '';
      if (pa !== pb) { return pa < pb ? -1 : 1; }
      return a.createdAt < b.createdAt ? 1 : -1;
    });

    var lines = [
      '## Feedback batch \u2014 ' + allItems.length + ' item' + (allItems.length !== 1 ? 's' : ''),
      'Exported: ' + new Date().toLocaleString(),
      ''
    ];
    allItems.forEach(function (item) {
      lines.push('---');
      lines.push(wfFbFormatItemForLLM(item, item.id));
      lines.push('');
    });

    navigator.clipboard.writeText(lines.join('\n'))
      .then(function () { wfFbToast('Batch copied (' + allItems.length + ' items) \u2713'); })
      .catch(function () { wfFbToast('Copy failed \u2014 try again'); });
  };

  async function wfFbRenderReview() {
    var listEl = document.getElementById('wf-fb-review-list');
    if (!listEl) { return; }
    listEl.innerHTML = '<div class="wf-fb-review-loading">Loading…</div>';

    var allItems = [];
    if (_wfFbDirHandle) {
      // Flat structure: all items in {folder}/feedback/*.json and {folder}/resolved/*.json
      // Each JSON has a `page` field used for grouping below.
      var revSubfolders = ['feedback', 'resolved'];
      for (var rsi = 0; rsi < revSubfolders.length; rsi++) {
        try {
          var revSubDir = await _wfFbDirHandle.getDirectoryHandle(revSubfolders[rsi], { create: false });
          for await (var rEntry of revSubDir.values()) {
            if (rEntry.kind !== 'file' || !rEntry.name.endsWith('.json')) { continue; }
            try { allItems.push(JSON.parse(await (await rEntry.getFile()).text())); } catch (e) { }
          }
        } catch (e) { /* subfolder not yet created */ }
      }
    } else {
      allItems = wfFbLoadItems();
    }

    if (allItems.length === 0) {
      listEl.innerHTML = '<div class="wf-fb-review-empty">No feedback yet — notes you save on any page will appear here.</div>';
      return;
    }

    // Group by page
    var byPage = {};
    allItems.forEach(function (item) {
      var slug = item.page || 'unknown';
      if (!byPage[slug]) { byPage[slug] = []; }
      byPage[slug].push(item);
    });
    var slugs = Object.keys(byPage).sort();

    var html = '';
    slugs.forEach(function (slug) {
      var items = byPage[slug];
      var label = pageSlugToLabel(slug) || slug;
      var open  = items.filter(function (i) { return i.status !== 'done'; });
      var done  = items.filter(function (i) { return i.status === 'done'; });

      html += '<div class="wf-fb-rev-page">';
      html += '<div class="wf-fb-rev-page-hd">';
      html += '<span class="wf-fb-rev-page-name">' + wfFbEscHtml(label) + '</span>';
      html += '<span class="wf-fb-rev-counts">' + open.length + ' open</span>';
      html += '</div>';

      if (open.length > 0) {
        open.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
        open.forEach(function (it) { html += wfFbRevItemHTML(it); });
      }
      if (done.length > 0) {
        html += '<div class="wf-fb-rev-done-label">Done (' + done.length + ')</div>';
        done.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
        done.forEach(function (it) { html += wfFbRevItemHTML(it); });
      }
      html += '</div>';
    });

    listEl.innerHTML = html;
  }

  function wfFbRevItemHTML(item) {
    var isDone = item.status === 'done';
    var icon   = { question: '❓', issue: '🔴', decision: '☑️', suggestion: '💡', stakeholder: '👥', approved: '✅' };
    var typeLbl = (item.type || 'note');
    return '<div class="wf-fb-rev-item' + (isDone ? ' wf-fb-rev-item--done' : '') + '">' +
      '<span class="wf-fb-rev-icon">' + (icon[typeLbl] || '•') + '</span>' +
      '<span class="wf-fb-rev-desc">' + wfFbEscHtml(item.desc || '') + '</span>' +
    '</div>';
  }

  function wfFbEscHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Update the queue footer with folder connection status and agent last-checked time.
  async function wfFbUpdateFolderStatus() {
    var footer = document.getElementById('wf-fb-queue-footer');
    if (!footer) { return; }

    var lastChecked = '';
    if (_wfFbDirHandle) {
      lastChecked = await wfFbReadLastChecked();
    }

    if (_wfFbDirHandle) {
      // Show …/foldername — browser security limits access to the full OS path
      var safeName = wfFbEscHtml(_wfFbDirHandle.name);
      footer.innerHTML =
        '<span class="wf-fb-status wf-fb-status--on"' +
          ' onclick="wfFbConnectFolder()"' +
          ' title="Saving to folder \u2018' + _wfFbDirHandle.name + '\u2019\n(Full path not exposed by browser \u2014 click to change folder)">' +
          '\uD83D\uDCC1 <span class="wf-fb-status-path">\u2026/' + safeName + '</span></span>' +
        (lastChecked
          ? '<span class="wf-fb-status-sep">\u00b7</span>' +
            '<span class="wf-fb-status wf-fb-status--agent">Agent: ' + lastChecked + '</span>'
          : '');
    } else if (_wfFbPendingHandle) {
      // Handle loaded from IDB but browser needs a user gesture to re-grant permission
      var pendingName = wfFbEscHtml(_wfFbPendingHandle.name);
      footer.innerHTML =
        '<span class="wf-fb-status wf-fb-status--pending"' +
          ' title="Previously connected to \u2018' + _wfFbPendingHandle.name + '\u2019">' +
          '\uD83D\uDCC1 <span class="wf-fb-status-path">\u2026/' + pendingName + '</span></span>' +
        '<button class="wf-fb-reconnect-btn" type="button" onclick="wfFbReconnect()">Reconnect</button>';
    } else if (window.showDirectoryPicker) {
      footer.innerHTML =
        '<span class="wf-fb-status wf-fb-status--off"' +
          ' onclick="wfFbConnectFolder()"' +
          ' title="Connect a local folder to save notes as JSON files">' +
          '\uD83D\uDCC1 Connect folder</span>';
    } else {
      footer.innerHTML = ''; // API not available — don't show anything
    }
  }

  // Read the timestamp written by the watch agent to .agent-last-checked in the folder root.
  async function wfFbReadLastChecked() {
    if (!_wfFbDirHandle) { return ''; }
    try {
      var fh   = await _wfFbDirHandle.getFileHandle('.agent-last-checked', { create: false });
      var file = await fh.getFile();
      var ts   = parseInt((await file.text()).trim(), 10);
      if (!ts) { return 'never'; }
      var ms = Date.now() - ts;
      if (ms < 60000)    { return 'just now'; }
      if (ms < 3600000)  { return Math.floor(ms / 60000) + 'm ago'; }
      return Math.floor(ms / 3600000) + 'h ago';
    } catch (e) { return 'never'; }
  }

  // Write (create or overwrite) a single feedback item as a JSON file.
  // Path: {connectedFolder}/feedback/{n}.json   (status !== 'done')
  //       {connectedFolder}/resolved/{n}.json   (status === 'done')
  //  Screenshots saved alongside: {n}.png, {n}.1.png, {n}.2.png …
  async function wfFbWriteFile(item) {
    if (!_wfFbDirHandle) { return; }
    try {
      var subName    = (item.status === 'done') ? 'resolved' : 'feedback';
      var subDir     = await _wfFbDirHandle.getDirectoryHandle(subName, { create: true });
      var filename   = item.id + '.json';
      var fileHandle = await subDir.getFileHandle(filename, { create: true });
      var writable   = await fileHandle.createWritable();
      await writable.write(JSON.stringify(item, null, 2));
      await writable.close();
    } catch (e) {
      console.warn('[wf-feedback] File write failed:', e);
    }
  }

  // Delete a feedback JSON file from a specific subfolder.
  // Used when moving an item between feedback/ and resolved/.
  async function wfFbDeleteFile(id, type, subfolder) {
    if (!_wfFbDirHandle) { return; }
    try {
      var subDir = await _wfFbDirHandle.getDirectoryHandle(subfolder, { create: false });
      // Try new naming (1.json) first; fall back to old (id--type.json)
      try { await subDir.removeEntry(id + '.json'); } catch (e1) {
        try { await subDir.removeEntry(id + '--' + type + '.json'); } catch (e2) { /* ok */ }
      }
    } catch (e) { /* dir may not exist — ok */ }
  }

  // ── IndexedDB: persist folder handle across page navigations ────────
  // FileSystemDirectoryHandle can be stored in IDB (structured clone supports it).
  // Same browser session: queryPermission returns 'granted' → silent restore.
  // New browser session: queryPermission returns 'prompt' → show Reconnect button.

  function wfFbOpenDB() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open('pcp-wireframe-fb', 1);
      req.onupgradeneeded = function (e) { e.target.result.createObjectStore('handles'); };
      req.onsuccess = function (e) { resolve(e.target.result); };
      req.onerror   = function (e) { reject(e.target.error); };
    });
  }

  async function wfFbSaveDirHandle(handle) {
    if (!window.indexedDB) { return; }
    try {
      var db = await wfFbOpenDB();
      var tx = db.transaction('handles', 'readwrite');
      tx.objectStore('handles').put(handle, 'pcp-feedback-dir');
      if (tx.commit) { tx.commit(); }
    } catch (e) { /* IDB unavailable — skip silently */ }
  }

  // Called once after modal DOM is injected — no user gesture required.
  async function wfFbAutoRestore() {
    if (!window.indexedDB || !window.FileSystemDirectoryHandle) { return; }
    try {
      var db     = await wfFbOpenDB();
      var handle = await new Promise(function (resolve) {
        var tx  = db.transaction('handles', 'readonly');
        var req = tx.objectStore('handles').get('pcp-feedback-dir');
        req.onsuccess = function (e) { resolve(e.target.result || null); };
        req.onerror   = function ()  { resolve(null); };
      });
      if (!handle) { return; }
      var perm = await handle.queryPermission({ mode: 'readwrite' });
      if (perm === 'granted') {
        _wfFbDirHandle = handle;
        wfFbUpdateFolderStatus();
        wfFbRenderQueue();
      } else if (perm === 'prompt') {
        _wfFbPendingHandle = handle; // show Reconnect in footer
        wfFbUpdateFolderStatus();
      }
      // 'denied' → leave unconnected; user can pick a new folder manually
    } catch (e) { /* IDB or permission API error — silently ignore */ }
  }

  // User-triggered: re-request permission when the footer shows Reconnect.
  // Must be called from a click handler to count as a user gesture.
  window.wfFbReconnect = async function () {
    var handle = _wfFbPendingHandle;
    if (!handle) { return; }
    try {
      var result = await handle.requestPermission({ mode: 'readwrite' });
      if (result === 'granted') {
        _wfFbDirHandle     = handle;
        _wfFbPendingHandle = null;
        wfFbSaveDirHandle(_wfFbDirHandle);
        wfFbToast('Folder reconnected \u2713');
        wfFbUpdateFolderStatus();
        wfFbRenderQueue();
      } else {
        window.wfFbConnectFolder(); // permission denied — offer picker instead
      }
    } catch (e) {
      window.wfFbConnectFolder(); // requestPermission threw — fall back to picker
    }
  };

  // Read all feedback JSON files for a single page slug from the connected folder.
  // Reads from both feedback/ (open items) and resolved/ (done items) subfolders.
  // Also reads any legacy files directly in {page}/ for backward-compatibility.
  // Returns array sorted newest-first, or empty array if the page dir doesn't exist yet.
  // Read all items for `page` from the flat folder structure.
  // Files live in {folder}/feedback/*.json (open) and {folder}/resolved/*.json (done).
  // Each file's JSON has a `page` field; we filter to match the current page slug.
  async function wfFbReadPageFiles(page) {
    if (!_wfFbDirHandle) { return []; }
    var items = [];
    var subfolders = ['feedback', 'resolved'];
    for (var si = 0; si < subfolders.length; si++) {
      try {
        var subDir = await _wfFbDirHandle.getDirectoryHandle(subfolders[si], { create: false });
        for await (var entry of subDir.values()) {
          if (entry.kind !== 'file' || !entry.name.endsWith('.json')) { continue; }
          try {
            var parsed = JSON.parse(await (await entry.getFile()).text());
            if (parsed.page === page) { items.push(parsed); }
          } catch (e) { /* malformed file — skip */ }
        }
      } catch (e) { /* subfolder not yet created */ }
    }
    items.sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
    return items;
  }

  // Global paste handler — fires anywhere in the modal while it is open.
  // KEY FIX: check clipboard contents FIRST. If an image is present we always
  // capture it, regardless of what element currently has focus. An image
  // cannot be pasted as text, so intercepting it is always correct.
  // If the clipboard contains only text we do nothing and let the default
  // paste behaviour fill whatever input is active.
  document.addEventListener('paste', function (e) {
    var overlay = document.getElementById('wf-fb-overlay');
    if (!overlay || !overlay.classList.contains('open')) { return; }
    var items = e.clipboardData && e.clipboardData.items;
    if (!items) { return; }
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        var blob = items[i].getAsFile();
        if (blob) {
          wfFbReadImage(blob);
          e.preventDefault(); // stop any default image-paste behaviour
          wfFbToast('Screenshot captured \u2713');
        }
        return; // image found — don't fall through to text handling
      }
    }
    // No image in clipboard — let normal text paste proceed untouched
  });

  // ── Bootstrap ────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
