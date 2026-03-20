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
        name: 'Clone',
        value: 'clone',
        description: 'Clone an existing event',
        action: 'Clone an event',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new event',
        action: 'Create an event',
      },
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
  // ─── Create ──────────────────────────────────────────────────────────────
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the event',
    displayOptions: {
      show: {
        resource: ['event'],
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
    description: 'Additional optional fields for the event',
    displayOptions: {
      show: {
        resource: ['event'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: 'USD',
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
          { name: 'Cancelled', value: 'cancelled' },
          { name: 'Completed', value: 'completed' },
          { name: 'Draft', value: 'draft' },
          { name: 'Live', value: 'live' },
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
          { name: '-- No Change --', value: '' },
          { name: 'Cancelled', value: 'cancelled' },
          { name: 'Completed', value: 'completed' },
          { name: 'Draft', value: 'draft' },
          { name: 'Live', value: 'live' },
        ],
        default: '',
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

  // ─── Clone ───────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to clone',
    displayOptions: {
      show: {
        resource: ['event'],
        operation: ['clone'],
      },
    },
  },
  {
    displayName: 'Overrides',
    name: 'overrides',
    type: 'collection',
    placeholder: 'Add Override',
    default: {},
    description: 'Optional fields to override on the cloned event',
    displayOptions: {
      show: {
        resource: ['event'],
        operation: ['clone'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the cloned event',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'New start date for the cloned event',
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        description: 'New end date for the cloned event',
      },
    ],
  },
];
