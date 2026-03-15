import type { INodeProperties } from 'n8n-workflow';

export const analyticsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['analytics'],
      },
    },
    options: [
      {
        name: 'Export',
        value: 'export',
        description: 'Export event series data as CSV or JSON',
        action: 'Export analytics data',
      },
      {
        name: 'Get Stats',
        value: 'getStats',
        description: 'Get statistics for an event series',
        action: 'Get event stats',
      },
    ],
    default: 'getStats',
  },
];

export const analyticsFields: INodeProperties[] = [
  // ─── Get Stats ───────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to get statistics for',
    displayOptions: {
      show: {
        resource: ['analytics'],
        operation: ['getStats'],
      },
    },
  },

  // ─── Export ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to export data for',
    displayOptions: {
      show: {
        resource: ['analytics'],
        operation: ['export'],
      },
    },
  },
  {
    displayName: 'Format',
    name: 'format',
    type: 'options',
    required: true,
    options: [
      {
        name: 'CSV',
        value: 'csv',
        description: 'Export as comma-separated values',
      },
      {
        name: 'JSON',
        value: 'json',
        description: 'Export as JSON',
      },
    ],
    default: 'json',
    description: 'The export format',
    displayOptions: {
      show: {
        resource: ['analytics'],
        operation: ['export'],
      },
    },
  },
];
