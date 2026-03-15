# TODO — Pre-publish Checklist

## Phase 1: Blockers (must fix before publish)

- [ ] Add `LICENSE` file (MIT, matching package.json)
- [ ] Add `CHANGELOG.md` with initial release entry
- [ ] Verify API key provisioning flow works end-to-end (Settings > API Keys in dashboard)
- [ ] Whitelist OAuth2 callback URL on Cohost's OAuth server for production use
- [ ] Verify `Cohost.node.json` codex metadata covers all current resources (Event, Ticket, Coupon, Attendee, Series, Instance, Table, Channel, Analytics, Purchase Group)
- [ ] Ensure all 53 tests pass in CI (`npm test`)
- [ ] Confirm package name `n8n-nodes-cohost` is available on npm (n8n auto-indexes `n8n-nodes-*` packages)
- [ ] Add package.json metadata: `homepage`, `repository`, `bugs`, `keywords` (for npm discoverability)
- [ ] Update README: add signup CTA ("Get your API key at cohost.vip"), update resource tables to match current 10 resources
- [ ] Improve error messages: 401 → "Invalid API key — get one at cohost.vip/settings/api", 429 → rate limit guidance

## Phase 2: Package Quality (should fix before publish)

- [ ] Fix `copy-icons` script — uses Unix `cp` command, not cross-platform; replace with `shx cp` or `copyfiles`
- [ ] Document rate limiting behavior for Cohost API (`https://api.cohost.vip/v1`) — add retry/backoff guidance
- [ ] Review and polish all resource operation descriptions (these show in n8n's UI)
- [ ] Add `.npmignore` or configure `files` in package.json to exclude test files, `.github/`, etc.
- [ ] Verify `cohost.svg` icon renders correctly in n8n's node panel (brand colors: sky #0ea5e9, midnight #0a1520)
- [ ] Add `README.md` screenshots showing the node in n8n's workflow editor
- [ ] Add example workflows (e.g., "Sync new attendees to Google Sheets", "Clone event on schedule")
- [ ] Pin API base URL `https://api.cohost.vip/v1` — ensure no hardcoded staging/dev URLs remain
- [ ] Verify OAuth2 + API Key auth both work against production Cohost API

## Phase 3: Post-publish (can iterate after initial release)

- [ ] Submit to n8n community nodes directory (https://docs.n8n.io/integrations/community-nodes/)
- [ ] Add GitHub Actions CI workflow (lint, test, publish on tag)
- [ ] Add bulk operations where missing (e.g., bulk attendee create, bulk ticket update)
- [ ] Monitor npm download stats and n8n community feedback
- [ ] Add integration tests against a Cohost sandbox/test environment
- [ ] Document all supported operations in README with a resource/operation matrix
- [ ] Set up Renovate or Dependabot for dependency updates
