# n8n-nodes-cohost

![Cohost](nodes/Cohost/cohost.svg)

An [n8n](https://n8n.io) community node for the [Cohost](https://cohost.vip) event management and ticketing platform.

Automate workflows with Cohost — create and manage events, tickets, attendees, series, tables, channels, and more directly from your n8n instance.

## Get Started

1. Sign up at [cohost.vip](https://cohost.vip)
2. Go to **Settings > API Keys**
3. Create a new API key
4. Add it to your n8n Cohost credential

## Installation

### n8n Cloud or Self-Hosted

1. Go to **Settings > Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-cohost` and click **Install**

### Manual Installation

```bash
cd /path/to/your/n8n
npm install n8n-nodes-cohost
```

Restart n8n after installation.

## Authentication

| Method | Use Case |
|--------|----------|
| **API Key** | Direct integration — generate from Settings > API Keys |
| **OAuth2** | Delegated access for multi-tenant integrations |

Both methods support a configurable **Base URL** (default: `https://api.cohost.vip/v1`) for self-hosted or development environments.

## Supported Resources

| Resource | Operations |
|----------|------------|
| **Event** | Get, List, Create, Update, Delete, Clone, Set Location, Get Barcodes |
| **Ticket** | List, Create, Update, Delete, Quick Update |
| **Coupon** | Create, Get, List, Update, Delete |
| **Attendee** | List, Create, Delete, Bulk Delete |
| **Series** | Create, Create Instances, List Instances, Update |
| **Instance** | List, Create, Get, Update, Delete, Bulk Create |
| **Table** | List, Create, Update, Delete |
| **Channel** | List, Add, Remove |
| **Analytics** | Get Stats, Export |
| **Purchase Group** | List, Update, Delete |

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
npm install
npm run build
npm run dev    # watch mode
```

### Running Tests

```bash
npm test
```

### Project Structure

```
n8n-nodes-cohost/
├── credentials/
│   ├── CohostApi.credentials.ts        # API Key credential
│   └── CohostOAuth2Api.credentials.ts  # OAuth2 credential
├── nodes/Cohost/
│   ├── Cohost.node.ts                  # Main node with execute() routing
│   ├── Cohost.node.json                # n8n codex metadata
│   ├── GenericFunctions.ts             # API request helper
│   ├── cohost.svg                      # Node icon
│   ├── descriptions/                   # Resource/operation definitions
│   └── __tests__/                      # Unit tests
├── package.json
└── tsconfig.json
```

### Adding New Operations

1. Add or update a description file in `nodes/Cohost/descriptions/`
2. Export operations and fields from `descriptions/index.ts`
3. Handle the new operation inside `execute()` in `Cohost.node.ts`
4. Add tests in `__tests__/`

## Links

- [Cohost Platform](https://cohost.vip)
- [API Documentation](https://docs.cohost.vip/api)
- [n8n Community Nodes Docs](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
