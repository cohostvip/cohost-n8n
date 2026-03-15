import type { INodeProperties } from 'n8n-workflow';

export const purchaseGroupOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
      },
    },
    options: [
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a purchase group',
        action: 'Delete a purchase group',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'List all purchase groups for an event',
        action: 'Get many purchase groups',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a purchase group',
        action: 'Update a purchase group',
      },
    ],
    default: 'getMany',
  },
];

export const purchaseGroupFields: INodeProperties[] = [
  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to list purchase groups for',
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
        operation: ['getMany'],
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
    description: 'The ID of the event the purchase group belongs to',
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
        operation: ['update'],
      },
    },
  },
  {
    displayName: 'Purchase Group ID',
    name: 'purchaseGroupId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the purchase group to update',
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
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
    description: 'Fields to update on the purchase group',
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'name@email.com',
        description: 'The contact email for the purchase group',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name or label for the purchase group',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 3,
        },
        default: '',
        description: 'Internal notes about the purchase group',
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
    description: 'The ID of the event the purchase group belongs to',
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Purchase Group ID',
    name: 'purchaseGroupId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the purchase group to delete',
    displayOptions: {
      show: {
        resource: ['purchaseGroup'],
        operation: ['delete'],
      },
    },
  },
];
