import type { INodeProperties } from 'n8n-workflow';

export const channelOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['channel'],
      },
    },
    options: [
      {
        name: 'Add',
        value: 'create',
        description: 'Add a channel to an event',
        action: 'Add a channel',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'List all channels for an event',
        action: 'Get many channels',
      },
      {
        name: 'Remove',
        value: 'delete',
        description: 'Remove a channel from an event',
        action: 'Remove a channel',
      },
    ],
    default: 'getMany',
  },
];

export const channelFields: INodeProperties[] = [
  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to list channels for',
    displayOptions: {
      show: {
        resource: ['channel'],
        operation: ['getMany'],
      },
    },
  },

  // ─── Add (Create) ────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to add a channel to',
    displayOptions: {
      show: {
        resource: ['channel'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Channel Type',
    name: 'channelType',
    type: 'string',
    required: true,
    default: '',
    description: 'The type of channel to add (e.g. email, sms, push)',
    displayOptions: {
      show: {
        resource: ['channel'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    description: 'Additional optional fields for the channel',
    displayOptions: {
      show: {
        resource: ['channel'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Config (JSON)',
        name: 'configJson',
        type: 'string',
        default: '{}',
        description: 'JSON object with channel-specific configuration',
      },
    ],
  },

  // ─── Remove (Delete) ─────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event the channel belongs to',
    displayOptions: {
      show: {
        resource: ['channel'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Channel ID',
    name: 'channelId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the channel to remove',
    displayOptions: {
      show: {
        resource: ['channel'],
        operation: ['delete'],
      },
    },
  },
];
