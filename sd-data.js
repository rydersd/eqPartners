/* sd-data.js — Service Blueprint: all node and connection data
 * Edit this file to add/change nodes, labels, colors, or connections.
 * The renderer (sd-render.js) reads this data and generates the SVG.
 */
const SD_DATA = {
  viewBox: { w: 1060, h: 520 },

  /* ── Swim lanes ──────────────────────────────────────────────── */
  lanes: [
    { id: 'partner',  label: 'PARTNER ORG',             y: 0,   h: 108, fill: '#f0f7ff' },
    { id: 'portal',   label: 'EXPERIENCE CLOUD',         y: 108, h: 120, fill: '#fff'    },
    { id: 'workflow', label: 'WORKFLOWS & TRANSACTIONS', y: 228, h: 96,  fill: '#f8f6ff' },
    { id: 'sf',       label: 'SALESFORCE LIGHTNING',     y: 324, h: 104, fill: '#fff'    },
    { id: 'external', label: 'EXTERNAL SYSTEMS',         y: 428, h: 92,  fill: '#f0fdf4' },
  ],

  /* ── Lane 1: Partner Org actors ─────────────────────────────── */
  actors: [
    {
      id: 'jordan', cx: 130, cy: 55, r: 20, fill: '#3b82f6',
      initials: 'JR', label: 'Jordan', sublabel: 'Portal Admin',
      labelColor: '#1e40af', href: 'jtbd-jordan.html',
      title: 'Jordan Reeves · Portal Admin — configures the PM Portal, manages user access, and oversees partner program setup at CloudBridge',
    },
    {
      id: 'steve', cx: 250, cy: 55, r: 20, fill: '#3d6daa',
      initials: 'SR', label: 'Steve', sublabel: 'Sales Rep',
      labelColor: '#1e3a5f', href: 'jtbd-steve.html',
      title: 'Steve Rogers · Sales Rep — registers deals, tracks pipeline, and requests MDF through the Rep Portal',
    },
    {
      id: 'sam', cx: 370, cy: 55, r: 20, fill: '#1a7a3c', fillOpacity: 0.7,
      stroke: '#1a7a3c', strokeWidth: 1.5, strokeDasharray: '4,3',
      initials: 'SC', label: 'Sam', sublabel: 'Self-registers',
      labelColor: '#1a7a3c', href: 'jtbd-sam.html',
      title: 'Sam Chen · Prospective Partner — self-discovers the program externally and initiates onboarding (dashed circle = outside the invited partner flow)',
    },
    {
      id: 'brian', cx: 480, cy: 55, r: 16, fill: '#64748b',
      initials: 'BW', label: 'Brian', sublabel: 'Partner Exec',
      labelColor: '#475569', href: null,
      title: 'Brian Wang · Partner Exec — approves MDF requests, reviews QBR results, and represents CloudBridge in tier reviews',
    },
    {
      id: 'maria', cx: 580, cy: 55, r: 16, fill: '#dc2626',
      initials: 'MH', label: 'Maria', sublabel: 'End Customer',
      labelColor: '#991b1b', href: null,
      title: 'Maria Hernandez · End Customer — interacts via ECP; not a direct PCP portal user but appears in deal records as the end-customer contact',
    },
  ],

  /* ── Lane 2: Experience Cloud portals ───────────────────────── */
  portals: [
    {
      id: 'portal-onboarding', x: 60, y: 120, w: 110, h: 40, rx: 5,
      fill: '#ccfbf1', stroke: '#0d9488', strokeWidth: 1.5,
      label: 'Onboarding', sublabel: 'Pre-auth flow', labelColor: '#134e4a',
      href: 'onboarding-apply-wizard.html',
      title: 'Onboarding Portal — pre-auth Experience Cloud portal for new partner applications: D&B company lookup, contact setup, agreement, and account provisioning',
    },
    {
      id: 'portal-pm', x: 195, y: 120, w: 110, h: 40, rx: 5,
      fill: '#dbeafe', stroke: '#3b82f6', strokeWidth: 1.5,
      label: 'PM Portal', sublabel: 'Experience Cloud', labelColor: '#1e40af',
      href: 'pm-home-dashboard.html',
      title: 'PM Portal · Experience Cloud — program manager hub: deal pipeline, MDF management, tier tracking, certifications, and partner reporting',
    },
    {
      id: 'portal-rep', x: 325, y: 120, w: 110, h: 40, rx: 5,
      fill: '#e0e7ff', stroke: '#3d6daa', strokeWidth: 1.5,
      label: 'Rep Portal', sublabel: 'Experience Cloud', labelColor: '#1e3a5f',
      href: 'rep-home.html',
      title: 'Rep Portal · Experience Cloud — sales rep hub: deal registration, pipeline tracking, co-sell resources, enablement content, and MDF requests',
    },
    {
      id: 'portal-ecp', x: 455, y: 120, w: 90, h: 40, rx: 5,
      fill: '#fee2e2', stroke: '#dc2626', strokeWidth: 1.5,
      label: 'ECP', sublabel: 'Customer Portal', labelColor: '#991b1b',
      href: null,
      title: 'Equinix Customer Portal (ECP) — end-customer facing portal; outside direct PCP scope. Partner deal records reference ECP accounts for co-sell tracking.',
    },
  ],

  /* ── Lane 3: Workflow / transaction nodes ───────────────────── */
  workflows: [
    {
      id: 'wf-onboarding', x: 60, y: 242, w: 90, h: 34, rx: 4,
      fill: '#ccfbf1', stroke: '#0d9488', strokeWidth: 1, flow: 'onboarding',
      label: 'Partner', sublabel: 'Onboarding', labelColor: '#134e4a',
      href: 'flows-reference.html',
      title: 'Partner Onboarding — application → PSM review → legal agreement → Salesforce provisioning → portal activation. Avg. 5–14 days.',
    },
    {
      id: 'wf-dealreg', x: 170, y: 242, w: 90, h: 34, rx: 4,
      fill: '#dbeafe', stroke: '#2563eb', strokeWidth: 1, flow: 'dealreg',
      label: 'Deal', sublabel: 'Registration', labelColor: '#1e40af',
      href: 'flows-reference.html',
      title: 'Deal Registration — partner submits deal → PSM reviews for conflicts → AE co-sells → Deal Desk validates pricing. 48-hour SLA for PSM review.',
    },
    {
      id: 'wf-mdf', x: 280, y: 242, w: 90, h: 34, rx: 4,
      fill: '#fef3c7', stroke: '#d97706', strokeWidth: 1, flow: 'mdf',
      label: 'MDF', sublabel: 'Lifecycle', labelColor: '#92400e',
      href: 'flows-reference.html',
      title: 'MDF Lifecycle — partner requests funds → CMM approves → activity executes → claim submission → finance reconciliation. Tied to tier allocation.',
    },
    {
      id: 'wf-tier', x: 390, y: 242, w: 90, h: 34, rx: 4,
      fill: '#ede9fe', stroke: '#7c3aed', strokeWidth: 1, flow: 'tier',
      label: 'Tier', sublabel: 'Review', labelColor: '#4c1d95',
      href: 'flows-reference.html',
      title: 'Tier Review — annual automated assessment of revenue, certifications, and engagement scores. Triggers program agreement renewal and MDF reallocation.',
    },
    {
      id: 'wf-agreement', x: 500, y: 242, w: 90, h: 34, rx: 4,
      fill: '#dcfce7', stroke: '#166534', strokeWidth: 1, flow: 'agreement',
      label: 'Agreements', sublabel: '& Renewals', labelColor: '#166534',
      href: 'flows-reference.html',
      title: 'Agreements & Renewals — DocuSign-based partner program agreement. Triggered at onboarding and annually at tier review. Countersigned by PSM.',
    },
    {
      id: 'wf-training', x: 610, y: 242, w: 90, h: 34, rx: 4,
      fill: '#f1f5f9', stroke: '#64748b', strokeWidth: 1, flow: null,
      label: 'Training', sublabel: 'Certification', labelColor: '#475569',
      href: 'pm-cert-tracker.html',
      title: 'Training & Certification — SumTotal LMS integration syncs completion data into Salesforce. Cert counts feed directly into tier scoring.',
    },
    {
      id: 'wf-qbr', x: 720, y: 242, w: 90, h: 34, rx: 4,
      fill: '#f1f5f9', stroke: '#64748b', strokeWidth: 1, flow: null,
      label: 'QBR /', sublabel: 'JBP', labelColor: '#475569',
      href: null,
      title: "QBR / JBP — Marcus's quarterly business review prep: pulls deal data, MDF utilization, and tier progress. Joint Business Plan sets next-quarter targets.",
    },
    {
      id: 'wf-commission', x: 830, y: 242, w: 90, h: 34, rx: 4,
      fill: '#f1f5f9', stroke: '#64748b', strokeWidth: 1, flow: null,
      label: 'Commission', sublabel: 'Disputes', labelColor: '#475569',
      href: null,
      title: 'Commission Disputes — partner-initiated dispute escalation. Routes to Deal Desk (Rachel Kim) and ERP/Finance for payout reconciliation.',
    },
  ],

  /* ── Lane 4: Salesforce internal roles ──────────────────────── */
  sfNodes: [
    {
      id: 'sf-psm', x: 60, y: 338, w: 100, h: 42, rx: 4,
      fill: '#f0f0f0', stroke: '#1e2a3a', strokeWidth: 1.5,
      label: 'PSM', sublabel: 'Marcus Chen', labelColor: '#1e2a3a', sublabelColor: '#475569',
      href: 'jtbd-marcus.html',
      title: 'PSM · Marcus Chen — Partner Success Manager at Equinix. Manages 5–15 partners, reviews deals, resolves disputes, runs QBRs, and co-signs program agreements.',
    },
    {
      id: 'sf-pam', x: 185, y: 338, w: 100, h: 42, rx: 4,
      fill: '#ede9fe', stroke: '#6d28d9', strokeWidth: 1.5,
      label: 'PAM', sublabel: 'Alex Rivera', labelColor: '#4c1d95', sublabelColor: '#4c1d95',
      href: 'jtbd-alex.html',
      title: 'PAM · Alex Rivera — Partner Account Manager. Handles day-to-day partner requests, enablement scheduling, and escalation triage before PSM involvement.',
    },
    {
      id: 'sf-ae', x: 310, y: 338, w: 80, h: 42, rx: 4,
      fill: '#f0f9ff', stroke: '#0891b2', strokeWidth: 1,
      label: 'Equinix AE', sublabel: 'Order mgmt', labelColor: '#0e7490', sublabelColor: '#0e7490',
      href: 'jtbd-equinix.html',
      title: 'Equinix AE — internal Account Executive. Co-sells with partner reps on registered deals, manages order entry, and coordinates with Deal Desk on pricing.',
    },
    {
      id: 'sf-cmm', x: 415, y: 338, w: 80, h: 42, rx: 4,
      fill: '#faf5ff', stroke: '#7c3aed', strokeWidth: 1,
      label: 'CMM', sublabel: 'Priya Nair', labelColor: '#6d28d9', sublabelColor: '#6d28d9',
      href: null,
      title: 'CMM · Priya Nair — Channel Marketing Manager. Reviews and approves MDF requests, sets activity expectations, and validates claim documentation.',
    },
    {
      id: 'sf-dealdesk', x: 520, y: 338, w: 80, h: 42, rx: 4,
      fill: '#f0f9ff', stroke: '#0891b2', strokeWidth: 1,
      label: 'Deal Desk', sublabel: 'Rachel Kim', labelColor: '#0e7490', sublabelColor: '#0e7490',
      href: null,
      title: 'Deal Desk · Rachel Kim — reviews non-standard deal terms, validates pricing exceptions, and handles commission dispute escalations from the partner portal.',
    },
    {
      id: 'sf-agentforce', x: 625, y: 338, w: 90, h: 42, rx: 4,
      fill: '#fafaf0', stroke: '#b45309', strokeWidth: 1,
      label: 'Agentforce', sublabel: 'AI layer', labelColor: '#92400e', sublabelColor: '#92400e',
      href: null,
      title: 'Agentforce — Salesforce AI layer. Handles automated triage, partner query routing, and deal conflict pre-screening before PSM review. Still in evaluation for PCP.',
    },
  ],

  /* ── Lane 5: External systems ───────────────────────────────── */
  extNodes: [
    {
      id: 'ext-sumtotal', x: 60, y: 444, w: 85, h: 34, rx: 4,
      fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1,
      label: 'SumTotal LMS', sublabel: 'Training sync', labelColor: '#166534',
      href: null,
      title: "SumTotal LMS — Equinix's learning management system. Syncs partner training completion and certification status into Salesforce for tier scoring.",
    },
    {
      id: 'ext-docusign', x: 165, y: 444, w: 80, h: 34, rx: 4,
      fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1,
      label: 'DocuSign', sublabel: 'e-signatures', labelColor: '#166534',
      href: null,
      title: 'DocuSign — e-signature platform. Used for program agreements at onboarding and tier review renewal. Both partner and PSM countersign.',
    },
    {
      id: 'ext-dnb', x: 265, y: 444, w: 80, h: 34, rx: 4,
      fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1,
      label: 'D&B', sublabel: 'Company data', labelColor: '#166534',
      href: null,
      title: 'Dun & Bradstreet — canonical company data lookup at onboarding. Search-before-create pattern prevents duplicate partner org records in Salesforce.',
    },
    {
      id: 'ext-mktgcloud', x: 365, y: 444, w: 90, h: 34, rx: 4,
      fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1,
      label: 'Mktg Cloud', sublabel: 'Email/notifs', labelColor: '#166534',
      href: null,
      title: 'Salesforce Marketing Cloud — transactional email for onboarding steps, deal status updates, MDF approvals, and tier review notifications to partner contacts.',
    },
    {
      id: 'ext-erp', x: 475, y: 444, w: 80, h: 34, rx: 4,
      fill: '#f0fdf4', stroke: '#16a34a', strokeWidth: 1,
      label: 'ERP / Finance', sublabel: 'Commissions', labelColor: '#166534',
      href: null,
      title: 'ERP / Finance System — commission calculation and payout reconciliation. Receives deal close data from Salesforce; partner disputes route back through Deal Desk.',
    },
  ],

  /* ── Default connectors (always visible, gray) ──────────────── */
  /* Each entry: { from:[x,y], to:[x,y], dash?:bool, sw?:number } */
  defaultConns: [
    // Actor → portal (solid 1.5)
    { from: [130,  75], to: [115, 119], sw: 1.5 },
    { from: [130,  75], to: [200, 119], sw: 1.5 },
    { from: [250,  75], to: [250, 119], sw: 1.5 },
    { from: [370,  75], to: [340, 119], sw: 1.5 },
    // Portal → workflow (dashed 1)
    { from: [115, 161], to: [105, 241], dash: true, sw: 1 },
    { from: [250, 161], to: [215, 241], dash: true, sw: 1 },
    { from: [380, 161], to: [215, 241], dash: true, sw: 1 },
    // Workflow → SF internal (dashed 1)
    { from: [215, 277], to: [110, 337], dash: true, sw: 1 },
    { from: [325, 277], to: [235, 337], dash: true, sw: 1 },
    // SF → external (dashed 1)
    { from: [110, 381], to: [102, 443], dash: true, sw: 1 },
    { from: [110, 381], to: [165, 443], dash: true, sw: 1 },
    { from: [235, 381], to: [205, 443], dash: true, sw: 1 },
  ],

  /* ── Workflow highlight paths (shown one at a time via filter) ─ */
  flows: {
    onboarding: {
      color: '#0d9488', marker: 'teal', label: 'Onboarding',
      highlights: ['wf-onboarding'],
      conns: [
        { from: [130, 75],  to: [115, 119] },
        { from: [115, 161], to: [105, 241] },
        { from: [105, 277], to: [110, 337] },
        { from: [110, 381], to: [165, 443] },
      ],
    },
    dealreg: {
      color: '#2563eb', marker: 'blue', label: 'Deal Registration',
      highlights: ['wf-dealreg'],
      conns: [
        { from: [250, 75],  to: [250, 119] },
        { from: [370, 75],  to: [340, 119] },
        { from: [380, 161], to: [215, 241] },
        { from: [215, 277], to: [110, 337] },
        { from: [350, 381], to: [515, 443] },
      ],
    },
    mdf: {
      color: '#d97706', marker: 'amber', label: 'MDF Lifecycle',
      highlights: ['wf-mdf'],
      conns: [
        { from: [130, 75],  to: [200, 119] },
        { from: [250, 161], to: [325, 241] },
        { from: [325, 277], to: [235, 337] },
        { from: [235, 381], to: [455, 443] },
      ],
    },
    tier: {
      color: '#7c3aed', marker: 'purple', label: 'Tier Review',
      highlights: ['wf-tier'],
      conns: [
        { from: [670, 381], to: [435, 278], dash: true, dashPattern: '6,3' },
        { from: [110, 337], to: [235, 337] },
        { from: [435, 277], to: [250, 161] },
      ],
    },
    agreement: {
      color: '#166534', marker: 'green', label: 'Agreements',
      highlights: ['wf-agreement'],
      conns: [
        { from: [130, 75],  to: [115, 119] },
        { from: [115, 161], to: [545, 241] },
        { from: [545, 277], to: [110, 337] },
        { from: [110, 381], to: [205, 443] },
      ],
    },
  },

  /* ── "Lines of visibility" dashed rules ─────────────────────── */
  visibilityLines: [
    { y: 108, label: '— line of visibility (partner / portal) —' },
    { y: 228, label: '— line of internal interaction —' },
    { y: 324, label: '— line of support (external systems) —' },
  ],
};
