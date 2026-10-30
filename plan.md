# AdIntel MVP plan

## Product approach

AdIntel is a research workspace for e-commerce founders, YouTubers, and influencers. The MVP is a single-screen, report-first experience: a user chooses a persona, provides a website and niche, starts a research run, and lands in a competitor intelligence report. The report uses realistic seeded data now, but the domain model and copy explicitly prepare for official Meta/Facebook APIs, permitted providers, and user-authorized Instagram assets. Direct scraping is not implemented because it may violate platform terms and is unreliable.

The UI will use client-side state for this first demo so the core product can be evaluated immediately. The existing server, auth, database, and tRPC starter remain in place for the next slice: authenticated workspaces, saved reports, provider adapters, billing, and server-side research jobs. A $1 CTA is presented as a demo action until a secure one-time checkout is connected.

## Design direction

### Style options

- **Signal editorial** — 0.06 probability: an editorial dashboard with ink, cream, and electric accent colors that makes research feel like a sharp creative brief.
- **Midnight performance lab** — 0.04 probability: a dark analytics console with neon metrics and dense visual language.
- **Soft SaaS starter** — 0.03 probability: a familiar light SaaS layout with blue accents and conservative card hierarchy.

### Chosen style: Signal editorial

- **Design Movement:** modern editorial intelligence tool; a creative brief meets a focused analyst console.
- **Core Principles:** high-signal hierarchy, calm whitespace, evidence beside interpretation, and fast scanning.
- **Color Philosophy:** warm off-white is the reading surface; black ink conveys authority; electric violet is an ownable signal color for insight and action; muted lavender and sage distinguish evidence states without noise.
- **Layout Paradigm:** a persistent left rail anchors the workspace while the main canvas uses asymmetrical report sections: research input up front, a horizontal competitor strip, then a two-column creative evidence and synthesis area.
- **Signature Elements:** oversized numeric rank badges, thin ruled dividers, and violet “signal” pills that look like editorial annotations.
- **Interaction Philosophy:** every control should make the next research step obvious; expandable scripts preserve scanning speed while rewarding curiosity; status copy explains why data is or is not available.
- **Animation:** use restrained 150–220ms fades and height transitions for script expansion, a soft pulse for active research, and no decorative motion competing with the report.
- **Typography System:** use Plus Jakarta Sans for the interface and headings, with a compact uppercase mono treatment for metadata and tags. Keep headings tight and body copy relaxed.
- **Brand Essence:** AdIntel turns competitor creative noise into a confident next brief. Personality: incisive, composed, practical.
- **Brand Voice:** direct, specific, optimistic. Example lines: “See what your category is already rewarding.” “Borrow the pattern, not the pixels.”
- **Wordmark & Logo:** a compact “A/” mark where the slash doubles as a signal cursor, paired with the AdIntel wordmark.
- **Signature Brand Color:** signal violet #6E56CF.

## Implementation structure

- `client/src/pages/Home.tsx`: the complete responsive research workspace, onboarding form, seeded report, persona state, expandable script interactions, synthesis section, and compliance messaging.
- `client/src/index.css`: global editorial palette, typography, layout utilities, and responsive behavior.
- `client/src/App.tsx`: route entry and existing providers.
- `public/manus-routes.json`: declared route manifest for `/` and `/404`.
- `app.config.ts`: project logo metadata.
- `server/`, `drizzle/`: preserve the initialized account/database architecture for the next persistence and provider-integration slice.

## Delivery shape

Run the existing `pnpm dev` server on port 3000 for Preview. Validate the TypeScript project and production build after implementation. Keep the MVP self-contained and use CSS gradients/blocks for creative placeholders so no external assets are required for the internal dashboard.
