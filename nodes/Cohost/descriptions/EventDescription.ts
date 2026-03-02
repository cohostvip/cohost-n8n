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
        name: 'Delete',
        value: 'delete',
        description: 'Delete an event',
        action: 'Delete an event',
      },
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
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing event',
        action: 'Update an event',
      },
    ],
    default: 'get',
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

  // ─── Get Many ────────────────────────────────────────────────────────────
  // No required fields — lists all events

  // ─── Update ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to update',
    displayOptions: {
      show: {
        resource: ['event'],
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
    description: 'Fields to update on the event',
    displayOptions: {
      show: {
        resource: ['event'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        description: 'The currency code for the event (e.g. USD)',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'The description of the event',
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        description: 'The end date and time of the event',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the event',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'The start date and time of the event',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Draft', value: 'draft' },
          { name: 'Live', value: 'live' },
          { name: 'Cancelled', value: 'cancelled' },
          { name: 'Completed', value: 'completed' },
        ],
        default: 'draft',
        description: 'The status of the event',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: '',
        description: 'The timezone for the event (e.g. America/New_York)',
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
    description: 'The ID of the event to delete',
    displayOptions: {
      show: {
        resource: ['event'],
        operation: ['delete'],
      },
    },
  },
];
