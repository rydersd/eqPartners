# Building with Cowork: How Human-AI Collaboration Actually Works

*A field guide for PCP wireframe teammates, assembled from a real working session.*

---

## What This Is

This guide is drawn directly from a multi-session build — the PCP (Partner Channel Program) wireframe project. Rather than describe Cowork in the abstract, it shows how a real project actually moves: what messages work, how mistakes get corrected, how ideas evolve from a vague directive to committed code.

If you're joining this project or starting your own, this is the fastest way to understand what to expect and how to get the most out of it.

---

## How Sessions Work

### Project Memory Lives in CLAUDE.md

Every session reads from a file called `CLAUDE.md` inside the project folder. Think of it as a persistent briefing document — it records design decisions, persona accuracy notes, source rules, git workflow, and anything else that needs to survive across sessions.

When a decision is made ("always search-before-create on company lookups"), it gets written to CLAUDE.md. The next session starts already knowing it.

**What that means for you:** If you make a decision that should stick — a design pattern, a naming convention, a rule about sourcing — say so and it'll get recorded. You won't have to repeat yourself.

### Sessions Can Pick Up Mid-Task

When a session runs long, Cowork summarizes the work-in-progress and carries it into the next session. The new session starts with full context: what was being built, what files were touched, what was still pending.

In this project, for example, one session was creating `functions/feedback.js` (a Cloudflare Pages email function) when it hit the context limit. The next session picked up the pending tasks — updating the feedback form's endpoint, adding the Transcript type, and adding a missing persona — without needing to be briefed.

### Git History Is Used

Cowork stages and commits files with descriptive messages. The log becomes part of the record. If you ask "what changed and why," the answer is in the git history.

---

## Interaction Patterns That Work

### Short, Plain Messages

You don't need to write a spec. The most effective messages in this project were one or two sentences — sometimes one clause.

> *"missing persona, registers partners."*

That was enough to trigger: research into the Partner Program Manager role across Equinix, Cisco, AWS, and Glassdoor sources; writing a full persona with stats, time allocation, frustrations, and design recommendations; inserting it into `personas.html` with correct numbering and a table entry; and committing it.

The clearer you are about what's missing or wrong, the better. You don't need to describe how to fix it.

### Mid-Task Corrections Land Immediately

Instructions given while work is in progress are honored, not queued. If you notice something wrong halfway through a build, say so — the direction changes in the same response.

In this session, while the Cloudflare email function was being wired up, two corrections arrived:

> *"don't use internal users names. use personas. Partner Program Manager."*
> *"missing persona, registers partners."*

Both were incorporated immediately. The feedback function was updated to remove internal Equinix names; the PPM persona task was added to the queue and completed in the same commit.

### Point Out Mistakes Directly

You don't need to soften correction. If something was changed that shouldn't have been changed, say it plainly.

> *"you changed the search, from searching company and region, to duns, i did not ask you to do that."*

The response was an immediate revert — all D&B/DUNS references removed, region dropdown restored, mock results updated, committed as a clean fix. No explanation needed beyond naming what was wrong.

### Vague Requests Get Interpreted and Built

You don't have to know the solution. Describing what you want to happen is enough.

> *"make the link to partner central in the email work, and clickable to the login screen, where the user must first create a password, i guess it doesn't go to login screen."*

That became: a new `partner-set-password.html` page (minimal transactional activation screen, distinct from the login page), updated CTA href and label in the confirmation email, real-time password requirements with show/hide toggles, submit gated until all requirements are met, navigation to the welcome screen on completion. Two commits.

### Uploading a File Gives Instant Context

Drag a file in and reference it. In this project, a meeting transcript was uploaded mid-session:

> *"we didn't finish wiring up the feedback mechanism to email it back to me from cloudflare. I just had a meeting and wanted to paste a transcript, that didn't work either."*

The transcript became context for action items. The feedback gap (Formspree pointing to the wrong email, no Transcript type in the form) was identified and fixed. The Transcript pill now expands the textarea to monospace, adjusts the placeholder, and reveals a Session Title field.

---

## How Ideas Evolved in This Project

### The Feedback Mechanism

**Start:** A working feedback form (`wf-feedback.html`) that saved notes locally and emailed via Formspree to an internal Equinix address.

**Problem:** Wrong destination email, Formspree as a dependency, no way to paste a transcript.

**Evolution:**
1. Created `functions/feedback.js` — a Cloudflare Pages Function that sends HTML email via Resend API to `ryder@rydersdesign.com`. No third-party form service. Gracefully degrades if the API key isn't set.
2. Updated `wf-feedback.html` to POST to `/feedback` instead of Formspree.
3. Added the Transcript type pill (full-width in the grid, expands textarea, switches to monospace font, shows a Session Title field, hides Severity — which doesn't apply to transcripts).

**Setup still needed:** Add `RESEND_API_KEY` to Cloudflare Pages → Settings → Environment Variables, and verify `rydersdesign.com` as a sending domain in Resend.

### The Partner Application Flow

**Start:** Onboarding screens with a search modal that had quietly been changed from company+region search to D&B/DUNS number lookup during a previous session.

**Problem:** The user never asked for DUNS. The change broke the established "search-before-create" pattern.

**Evolution:** Reverted to company name + region dropdown. Mock results updated with `region` field (not `duns`). Badges show "Matches region" / "Different region" depending on what the user selected. Region-mismatched results are dimmed and non-clickable.

### The Activation Flow

**Start:** An agreement confirmation page (`onboarding-agreement-confirmation.html`) with a broken "Log in to Partner Central" link pointing to `#`.

**Problem:** The user correctly noted it shouldn't go to the login screen — first-time users need to set a password, not log in.

**Evolution:** Created `partner-set-password.html` — a minimal transactional screen with no portal chrome. Pre-fills the user's email (read-only), has a password field with real-time requirement checklist (12+ chars, uppercase, number, special character), a confirm field with mismatch detection, submit disabled until all requirements are met. Navigates to `onboarding-welcome.html` on submit.

Updated the confirmation email CTA to say "Activate your account" and link to `/auth/activate` (not `/auth/login`).

### The Personas

**Start:** Three personas: Steve Rogers (AE), Jordan Reeves (Portal Admin), Marcus Chen (PSM).

**Problem:** The person who reviews and approves partner applications — the gatekeeper for the entire onboarding flow — had no persona.

**Evolution:** Added Alex Rivera, Partner Program Manager. The persona was grounded in publicly accessible sources (Glassdoor, Zippia, Impartner, Moxo, Crossbeam, Introw) before a single word was written. Key distinctions from Marcus (the PSM): Alex owns the program structure, tier criteria, and the application approval queue. Marcus owns the individual partner relationship after Alex hands it off. Alex is the reason the "search-before-create" pattern matters — duplicate records are her problem to clean up.

---

## What Cowork Does Well on This Kind of Project

**Picking up and continuing.** You don't re-explain what you're building. The project memory, git log, and session summary handle that.

**Research before writing.** For the PPM persona, a full research pass happened before the HTML was touched. The persona section cited Glassdoor salary ranges, job title variations from actual Equinix postings, and pain points from multiple industry sources — all public, all linked.

**Staying in the design language.** New screens (`partner-set-password.html`, `partner-set-password.html`) matched the visual pattern of existing transactional screens without being told to. Dark background, Equinix logo, no nav, same CSS variable naming.

**Committing with context.** Git messages describe what changed *and why*. Not just "update feedback.html" but what the endpoint changed to, why the Transcript type was added, what env var needs to be configured.

**Honoring corrections without pushback.** When something is wrong, it gets fixed. There's no debate about what was intended.

---

## Tips for Your First Session

**Keep CLAUDE.md updated.** If you make a design decision that should be permanent, say "add this to the project notes." It'll be there next time.

**Name what's wrong, not how to fix it.** "The button label is wrong" works. You don't have to say "change line 47 from X to Y."

**Upload files for context.** Meeting notes, screenshots, a list of Jira tickets — anything that gives background. Text files and PDFs work well.

**Short messages are fine.** Especially for corrections. The more direct the better.

**Check the git log to see what changed.** Every session's work is committed with a message that explains the reasoning. If you're picking up after a break, `git log --oneline` tells you where things stand.

---

*This guide was assembled from the PCP wireframe build session on 2026-02-24.*
