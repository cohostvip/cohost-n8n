import type { INodeProperties } from 'n8n-workflow';

export const eventOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['event'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get an event by ID',
        action: 'Get an event',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get a list of events',
        action: 'Get many events',
      },
    ],
    default: 'getMany',
  },
];

export const eventFields: INodeProperties[] = [
  // ─── Get ─────────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to retrieve',
    displayOptions: {
      show: {
        resource: ['event'],
        operation: ['get'],
      },
    },
  },
];
