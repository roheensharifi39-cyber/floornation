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

## Demo behaviour

- Consultation and furniture request forms validate in-browser but do not transmit or permanently store data.
- Uploaded inspiration files remain in the current browser session only.
- Case studies and testimonials are realistic presentation content, not claims of verified public projects or reviews.
- Phone, email, and WhatsApp links open real communication channels using the supplied Floor Nation contact details.
- Instagram and Facebook icons currently open their platform homepages because account handles were not supplied.
