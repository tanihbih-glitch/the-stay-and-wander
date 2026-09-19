# Price Index Navigation Enhancements — 2026-09-19

- [x] Audit existing canonical Bali and Bangkok price-index navigation and supporting components.
- [x] Add visible Home › Blog › article breadcrumbs, related-article cards, and tier-specific contents anchors.
- [x] Run focused and full validation, including desktop Bali and mobile Bangkok reviews. The desktop layout retains a left sticky table of contents and clear tier cards; the mobile layout keeps the contents panel in flow and renders related-guide cards without horizontal overflow. A hydration-aware anchor correction was verified: a direct Bali private-villa fragment waits for client rendering and then lands on the matching card.
- [x] Save checkpoints and confirm public propagation. Both canonical index pages serve production HTML with the correct canonical and modified-date signals; after hydration, the public Bali private-villa deep link lands on its intended tier card.
