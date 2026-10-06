# Bangkok vs Ho Chi Minh City enhancements — 2026-10-07

- [x] Added a browser-local downloadable PDF city-cost planning card with selected-month and source-boundary caveats.
- [x] Added a persona-tailored Ho Chi Minh City neighborhood breakdown covering Districts 1, 2/Thao Dien, 3, 4, 5/Cho Lon, 7/Phu My Hung, and Binh Thanh.
- [x] Added an explicit January–December 2026 month selector using only documented KAYAK seasonal direction; no interpolated rates are presented.
- [x] Updated the reusable `travel-site-engagement-rollout` skill with comparison-planner patterns using the skill-creator workflow; validation passed.
- [x] Added regression coverage for planner, neighborhood, seasonal, source-boundary, route, FAQ, and SSR behavior.
- [x] Focused planner tests: 22 passed after the final month-selector refinement.
- [x] Full suite: 39 test files / 224 tests passed before the final selector-only refinement; TypeScript and production build passed.
- [x] Fresh desktop and mobile screenshots reviewed; live browser selected December 2026, displayed the documented $225 source rate and high-season signal, and confirmed “PDF downloaded” status.
- [ ] Save the publication checkpoint and verify custom-domain propagation.
