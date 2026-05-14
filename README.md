# Fund Collector

Manual fund data onboarding wizard for TresoWealth. Collects structured fund data that isn't available through automated scrapers.

## What it does

- Multi-step wizard for fund intake: PMS, AIF Cat 1/2/3, SIF, Mutual Fund
- CSV upload templates for NAV history, portfolio holdings, sector allocation
- Drag-and-drop file upload with validation
- Data transformation to B2B schema format

## Architecture fit

```
Fund Collector (THIS)     →     B2B API     →     RDS PostgreSQL
Manual data intake              Schema validation      tresowealth_b2b.*
CSV → structured JSON           POST /b2b/schemes      scheme_master, nav_history,
                                POST /b2b/plans        plan_master, portfolio_holdings
```

Currently writes to Google Apps Script. Target: wire directly to B2B API endpoints.

## Supported jurisdictions

| Jurisdiction | Status |
|-------------|--------|
| India (PMS, AIF, MF, SIF) | Implemented |
| Gift City (SIF) | Implemented |
| UAE | Not built |
| Singapore | Not built |
| Mauritius | Not built |

## Next steps

- [ ] Replace Google Apps Script backend with B2B API calls
- [ ] Add UAE, Singapore, Mauritius jurisdiction templates
- [ ] Add field-level validation against B2B schema constraints
- [ ] Integrate with Finalyca adapter for automated data enrichment
- [ ] Add duplicate detection (ISIN + plan_code)
- [ ] Port from CRA to Vite (same stack as Dyad)

## Status

Published snapshot May 2026. Working copy at `treso-fund-collector/` in the main repo.
