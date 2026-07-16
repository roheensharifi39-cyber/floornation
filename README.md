# Floor Nation

Premium, mobile-first website demo for Floor Nation Timber Trading Co. L.L.C., Dubai. The site presents interior flooring, outdoor living systems, a reusable project portfolio, and a guided custom furniture request experience.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

With the local server running, rendered route and overflow checks can be run with:

```bash
npm run qa
npm run qa:interactions
```

QA screenshots and the machine-readable report are written to the ignored `qa-artifacts/` directory.

## Updating content

- Add a project by appending one typed object to `data/projects.ts`. The same object supplies the portfolio card, filters, static case-study route, facts, gallery, materials, and related service links. Add a new label to `projectFilters` only when introducing a new category.
- Add a service by appending an object to `data/services.ts`. The service directory, category filters, deep links, and related-project connection are generated from that data.
- Add or edit spaces, furniture types, budgets, request steps, or design directions in `data/furniture.ts`. A new direction needs a label, description, verified image URL, and meaningful image alt text.
- Add a testimonial presentation item in `data/testimonials.ts`. Keep the on-page demo disclosure unless the content becomes a verified, publishable customer review.
- Add gallery images inside a project’s `gallery` array in `data/projects.ts`; no route component changes are required.

## Production form integration

The consultation handler in `components/layout/ConsultationDrawer.tsx` and the furniture request handler in `components/furniture/furniture-builder.tsx` are the two backend connection points. A production implementation should submit validated fields and files to a secure server route or CRM, return a server-generated reference, provide explicit success and failure states, and apply file scanning, size limits, retention rules, consent language, rate limiting, and spam protection. Secrets must remain in ignored environment files and server-only code.

## Demo behaviour

- Consultation and furniture request forms validate in-browser but do not transmit or permanently store data.
- Uploaded inspiration files remain in the current browser session only.
- Case studies and testimonials are realistic presentation content, not claims of verified public projects or reviews.
- Phone, email, and WhatsApp links open real communication channels using the supplied Floor Nation contact details.
- Social profiles are intentionally omitted until verified Floor Nation account handles are supplied; no placeholder profile links are shipped.
