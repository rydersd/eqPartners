# CLAUDE.md — Equinix Partner Connect Portal (PCP) Wireframes

## Current State
- Sitemap: `mnt/outputs/pages/sitemap-pcp-v2.html` — v2.4, 89 pages
- Research: `mnt/outputs/pages/research-best-practices.html`
- Personas: `mnt/outputs/pages/personas.html`
- Last commit: see git log

---

## Persona Accuracy Notes

### Steve Rogers (Sales Rep / AE) — High accuracy
Title is correct. CloudBridge as mid-market SI is realistic. Compensation and pain points are well-backed.

### Jordan Reeves (Portal Admin) — Needs title revision
"Portal Administrator" as a standalone title is rare in practice. At a mid-market SI, this is typically a Sales Operations Manager or RevOps Manager who spends 40-60% of their time on partner portal/program management. The role is real; the dedicated title is not.

### Marcus Chen (PSM at Equinix) — High accuracy
Title, responsibilities, span of control (5-15 partners), and frustrations (deal disputes, attribution, QBR prep) all match public job postings and industry documentation.

---

## UX Design Decisions

### Onboarding: Search-Before-Create pattern (2026-02-23)
Both the wizard company search (`onboarding-apply-wizard.html`) and lead referral onboarding (`onboarding-apply-referral.html`) should default to **search-before-create**. The user searches for the partner org via D&B lookup first; manual field entry is a last resort fallback only. This prevents duplicate records and ensures canonical company data flows in from the start.

### Profile: Language & timezone (2026-02-25)
Language and timezone belong in the user profile page (`pm-profile.html`, Profile tab) — not in the onboarding wizard. This matches the B2B SaaS industry pattern (HubSpot, Salesforce EC) and avoids cluttering the onboarding flow.

---

## Git Workflow
- Git root for this project: `mnt/eqPartners/` (it is its own repo)
- Run git commands as: `git -C /sessions/gallant-exciting-gauss/mnt/eqPartners <command>`
- Commit message style: imperative, describe what changed and why
- Archived/deprecated screens go in `_archive/` (listed in `.gitignore`)
