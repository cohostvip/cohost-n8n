import type { INodeProperties } from 'n8n-workflow';

export const instanceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['instance'],
      },
    },
    options: [
      {
        name: 'Bulk Create',
        value: 'bulkCreate',
        description: 'Bulk create instances for an event',
        action: 'Bulk create instances',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new instance for an event',
        action: 'Create an instance',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an event instance',
        action: 'Delete an instance',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a specific event instance',
        action: 'Get an instance',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'List all instances for an event',
        action: 'Get many instances',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an event instance',
        action: 'Update an instance',
      },
    ],
    default: 'getMany',
  },
];

export const instanceFields: INodeProperties[] = [
  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to list instances for',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['getMany'],
      },
    },
  },

  // ─── Create ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to create an instance for',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Start Date',
    name: 'startDate',
    type: 'dateTime',
    required: true,
    default: '',
    description: 'The start date and time of the instance',
    displayOptions: {
      show: {
        resource: ['instance'],
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
    description: 'Additional optional fields for the instance',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        description: 'The end date and time of the instance',
      },
    ],
  },

  // ─── Get ─────────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event the instance belongs to',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Instance ID',
    name: 'instanceId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the instance to retrieve',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['get'],
      },
    },
  },

  // ─── Update ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event the instance belongs to',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Instance ID',
    name: 'instanceId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the instance to update',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    description: 'Fields to update on the instance',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        description: 'The end date and time of the instance',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'The start date and time of the instance',
      },
    ],
  },

  // ─── Delete ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event the instance belongs to',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Instance ID',
    name: 'instanceId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the instance to delete',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['delete'],
      },
    },
  },

  // ─── Bulk Create ─────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to bulk create instances for',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['bulkCreate'],
      },
    },
  },
  {
    displayName: 'Instances (JSON)',
    name: 'instancesJson',
    type: 'string',
    required: true,
    default: '[]',
    description: 'JSON array of instance objects to create (e.g. [{"startDate": "2024-01-01T10:00:00Z"}])',
    displayOptions: {
      show: {
        resource: ['instance'],
        operation: ['bulkCreate'],
      },
    },
  },
];
