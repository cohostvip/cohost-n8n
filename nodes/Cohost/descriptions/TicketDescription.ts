import type { INodeProperties } from 'n8n-workflow';

export const ticketOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['ticket'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new ticket type for an event',
        action: 'Create a ticket',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a ticket type',
        action: 'Delete a ticket',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get a list of ticket types for an event',
        action: 'Get many tickets',
      },
      {
        name: 'Quick Update',
        value: 'quickUpdate',
        description: 'Quick update ticket price, capacity, or status',
        action: 'Quick update ticket price, capacity, or status',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a ticket type',
        action: 'Update a ticket',
      },
    ],
    default: 'getMany',
  },
];

export const ticketFields: INodeProperties[] = [
  // ─── Create ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to create the ticket for',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the ticket type',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Price',
    name: 'price',
    type: 'number',
    required: true,
    default: 0,
    description: 'Price in cents (e.g. 2500 = $25.00)',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Currency',
    name: 'currency',
    type: 'string',
    required: true,
    default: 'USD',
    description: 'The currency code for the ticket price (e.g. USD)',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    required: true,
    default: 100,
    description: 'The total number of tickets available',
    displayOptions: {
      show: {
        resource: ['ticket'],
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
    description: 'Additional optional fields for the ticket',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Maximum Quantity',
        name: 'maximumQuantity',
        type: 'number',
        default: 10,
        description: 'Maximum number of tickets a buyer can purchase in one order',
      },
      {
        displayName: 'Minimum Quantity',
        name: 'minimumQuantity',
        type: 'number',
        default: 1,
        description: 'Minimum number of tickets a buyer must purchase in one order',
      },
      {
        displayName: 'Sales End',
        name: 'salesEnd',
        type: 'dateTime',
        default: '',
        description: 'The date and time when ticket sales end',
      },
      {
        displayName: 'Sales Start',
        name: 'salesStart',
        type: 'dateTime',
        default: '',
        description: 'The date and time when ticket sales begin',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Archived', value: 'archived' },
          { name: 'Draft', value: 'draft' },
          { name: 'Live', value: 'live' },
          { name: 'Sold Out', value: 'sold_out' },
        ],
        default: 'draft',
        description: 'The status of the ticket type',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Admission', value: 'admission' },
          { name: 'Admission - Table Commitment', value: 'admission.tableCommitment' },
          { name: 'Package', value: 'package' },
        ],
        default: 'admission',
        description: 'The type of ticket',
      },
    ],
  },

  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to list tickets for',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['getMany'],
      },
    },
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    description: 'Filters to apply when listing tickets',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'All', value: 'all' },
          { name: 'Archived', value: 'archived' },
          { name: 'Draft', value: 'draft' },
          { name: 'Live', value: 'live' },
          { name: 'Sold Out', value: 'sold_out' },
        ],
        default: 'all',
        description: 'Filter tickets by status',
      },
    ],
  },

  // ─── Update ──────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event the ticket belongs to',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Ticket ID',
    name: 'ticketId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the ticket to update',
    displayOptions: {
      show: {
        resource: ['ticket'],
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
    description: 'Fields to update on the ticket',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        description: 'The currency code for the ticket price (e.g. USD)',
      },
      {
        displayName: 'Maximum Quantity',
        name: 'maximumQuantity',
        type: 'number',
        default: 10,
        description: 'Maximum number of tickets a buyer can purchase in one order',
      },
      {
        displayName: 'Minimum Quantity',
        name: 'minimumQuantity',
        type: 'number',
        default: 1,
        description: 'Minimum number of tickets a buyer must purchase in one order',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the ticket type',
      },
      {
        displayName: 'Price',
        name: 'price',
        type: 'number',
        default: 0,
        description: 'Price in cents (e.g. 2500 = $25.00)',
      },
      {
        displayName: 'Quantity',
        name: 'quantity',
        type: 'number',
        default: 100,
        description: 'The total number of tickets available',
      },
      {
        displayName: 'Sales End',
        name: 'salesEnd',
        type: 'dateTime',
        default: '',
        description: 'The date and time when ticket sales end',
      },
      {
        displayName: 'Sales Start',
        name: 'salesStart',
        type: 'dateTime',
        default: '',
        description: 'The date and time when ticket sales begin',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: '-- No Change --', value: '' },
          { name: 'Archived', value: 'archived' },
          { name: 'Draft', value: 'draft' },
          { name: 'Live', value: 'live' },
          { name: 'Sold Out', value: 'sold_out' },
        ],
        default: '',
        description: 'The status of the ticket type',
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
    description: 'The ID of the event the ticket belongs to',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Ticket ID',
    name: 'ticketId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the ticket to delete',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['delete'],
      },
    },
  },

  // ─── Quick Update ────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event the ticket belongs to',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['quickUpdate'],
      },
    },
  },
  {
    displayName: 'Ticket ID',
    name: 'ticketId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the ticket to update',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['quickUpdate'],
      },
    },
  },
  {
    displayName: 'Price',
    name: 'price',
    type: 'number',
    default: undefined as unknown as number,
    description: 'New price in cents (e.g. 2500 = $25.00). Leave empty to keep current value.',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['quickUpdate'],
      },
    },
  },
  {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    default: undefined as unknown as number,
    description: 'New total capacity. Leave empty to keep current value.',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['quickUpdate'],
      },
    },
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'options',
    options: [
      { name: '(No Change)', value: '' },
      { name: 'Archived', value: 'archived' },
      { name: 'Draft', value: 'draft' },
      { name: 'Live', value: 'live' },
      { name: 'Sold Out', value: 'sold_out' },
    ],
    default: '',
    description: 'New status. Select "(No Change)" to keep current value.',
    displayOptions: {
      show: {
        resource: ['ticket'],
        operation: ['quickUpdate'],
      },
    },
  },
];
