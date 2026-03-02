# n8n-nodes-cohost

An n8n community node for the [Cohost](https://cohost.vip) event management and ticketing platform.

## What is this?

This package provides an n8n node that lets you automate workflows with Cohost — create and manage events, monitor orders, handle tickets, and manage coupons directly from your n8n instance.

## Supported Resources

- **Event** — Create, retrieve, update, and delete events
- **Order** — Retrieve and refund orders
- **Ticket** — Retrieve tickets and check in attendees
- **Coupon** — Create, retrieve, and delete discount coupons

## Authentication

Two authentication methods are supported:

- **API Key** — Generate an API key from your Cohost dashboard under Settings > API
- **OAuth2** — Use OAuth2 for delegated access (useful for multi-tenant integrations)

## Installation

### In n8n Cloud or Self-Hosted n8n

1. Go to **Settings > Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-cohost` and click **Install**

### Manual Installation (self-hosted)

```bash
cd /path/to/your/n8n
npm install n8n-nodes-cohost
```

Restart n8n after installation.

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

### Project Structure

```
n8n-nodes-cohost/
├── credentials/
│   ├── CohostApi.credentials.ts       # API Key credential
│   └── CohostOAuth2Api.credentials.ts # OAuth2 credential
├── nodes/
│   └── Cohost/
│       ├── Cohost.node.ts             # Main node implementation
│       ├── Cohost.node.json           # n8n codex metadata
│       └── cohost.svg                 # Node icon
├── dist/                              # Compiled output (generated)
├── package.json
└── tsconfig.json
```

### Adding New Operations

1. Add the operation option to the relevant resource's `operation` property in `Cohost.node.ts`
2. Handle the new operation inside the `execute()` method
3. Add any new input fields with appropriate `displayOptions` to show only for that operation

### Publishing

```bash
npm run prepublishOnly  # Runs the build
npm publish
```

## Links

- [Cohost Platform](https://cohost.vip)
- [API Documentation](https://docs.cohost.vip/api)
- [n8n Community Nodes Docs](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
