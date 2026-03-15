import type { INodeProperties } from 'n8n-workflow';

export const tableOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['table'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a table for an event',
        action: 'Create a table',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a table from an event',
        action: 'Delete a table',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'List all tables for an event',
        action: 'Get many tables',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a table for an event',
        action: 'Update a table',
      },
    ],
    default: 'getMany',
  },
];

export const tableFields: INodeProperties[] = [
  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to list tables for',
    displayOptions: {
      show: {
        resource: ['table'],
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
    description: 'The ID of the event to create a table for',
    displayOptions: {
      show: {
        resource: ['table'],
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
    description: 'The name of the table',
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Capacity',
    name: 'capacity',
    type: 'number',
    required: true,
    default: 10,
    description: 'The seating capacity of the table',
    displayOptions: {
      show: {
        resource: ['table'],
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
    description: 'Additional optional fields for the table',
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'A description for the table',
      },
      {
        displayName: 'Min Guests',
        name: 'minGuests',
        type: 'number',
        default: 1,
        description: 'Minimum number of guests required to book the table',
      },
      {
        displayName: 'Price',
        name: 'price',
        type: 'number',
        default: 0,
        description: 'Price of the table in cents (e.g. 50000 = $500.00)',
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
    description: 'The ID of the event the table belongs to',
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Table ID',
    name: 'tableId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the table to update',
    displayOptions: {
      show: {
        resource: ['table'],
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
    description: 'Fields to update on the table',
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Capacity',
        name: 'capacity',
        type: 'number',
        default: 10,
        description: 'The seating capacity of the table',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'A description for the table',
      },
      {
        displayName: 'Min Guests',
        name: 'minGuests',
        type: 'number',
        default: 1,
        description: 'Minimum number of guests required to book the table',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the table',
      },
      {
        displayName: 'Price',
        name: 'price',
        type: 'number',
        default: 0,
        description: 'Price of the table in cents (e.g. 50000 = $500.00)',
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
    description: 'The ID of the event the table belongs to',
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Table ID',
    name: 'tableId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the table to delete',
    displayOptions: {
      show: {
        resource: ['table'],
        operation: ['delete'],
      },
    },
  },
];
