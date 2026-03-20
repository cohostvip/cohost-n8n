# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-19

### Added

- Initial release of the Cohost n8n community node (`n8n-nodes-cohost`).
- **Authentication**: API Key and OAuth2 credential support.
- **Event** resource: create, get, get many, update, delete, clone, set location, get barcodes.
- **Ticket** resource: create, get many, update, delete, quick update.
- **Coupon** resource: create, get many, update, delete.
- **Attendee** resource: get many, create, delete, bulk delete.
- **Series** resource: create, create instances, get instances, update.
- **Event Instance** resource: get many, create, get, update, delete, bulk create.
- **Table** resource: get many, create, update, delete.
- **Channel** resource: get many, create, delete.
- **Analytics** resource: get stats, export.
- **Purchase Group** resource: get many, update, delete.
- **CohostTrigger** polling trigger node: watch for new attendees, new orders, and new events.
