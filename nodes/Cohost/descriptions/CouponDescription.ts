import type { INodeProperties } from 'n8n-workflow';

export const couponOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['coupon'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new coupon',
        action: 'Create a coupon',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a coupon',
        action: 'Delete a coupon',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get a list of coupons',
        action: 'Get many coupons',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing coupon',
        action: 'Update a coupon',
      },
    ],
    default: 'getMany',
  },
];

export const couponFields: INodeProperties[] = [
  // ─── Create ──────────────────────────────────────────────────────────────
  {
    displayName: 'Code',
    name: 'code',
    type: 'string',
    required: true,
    default: '',
    description: 'The coupon code that buyers will enter at checkout',
    displayOptions: {
      show: {
        resource: ['coupon'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Type',
    name: 'type',
    type: 'options',
    required: true,
    options: [
      {
        name: 'Access',
        value: 'access',
        description: 'Grants access to restricted tickets',
      },
      {
        name: 'Coded',
        value: 'coded',
        description: 'A discount code that buyers enter manually',
      },
      {
        name: 'Hold',
        value: 'hold',
        description: 'Holds tickets for a specific buyer',
      },
      {
        name: 'Public',
        value: 'public',
        description: 'Automatically applied discount',
      },
    ],
    default: 'coded',
    description: 'The type of coupon',
    displayOptions: {
      show: {
        resource: ['coupon'],
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
    description: 'Additional optional fields for the coupon',
    displayOptions: {
      show: {
        resource: ['coupon'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Amount Off',
        name: 'amountOff',
        type: 'number',
        default: 0,
        description: 'Fixed discount amount in cents (e.g. 500 = $5.00). Use either amountOff or percentOff, not both.',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'An internal description for this coupon',
      },
      {
        displayName: 'Event ID',
        name: 'eventId',
        type: 'string',
        default: '',
        description: 'Scope the coupon to a specific event. Used to populate contextIds.',
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 0,
        description: 'Maximum number of times this coupon can be used. Set to 0 for unlimited.',
      },
      {
        displayName: 'Offering IDs',
        name: 'offeringIds',
        type: 'string',
        default: '',
        description: 'Comma-separated list of ticket IDs this coupon applies to. Leave empty for all tickets.',
      },
      {
        displayName: 'Percent Off',
        name: 'percentOff',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 100,
        },
        default: 0,
        description: 'Percentage discount (0-100). Use either percentOff or amountOff, not both.',
      },
    ],
  },

  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    description: 'Filters to apply when listing coupons',
    displayOptions: {
      show: {
        resource: ['coupon'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Event ID',
        name: 'eventId',
        type: 'string',
        default: '',
        description: 'Filter coupons by event ID',
      },
    ],
  },

  // ─── Update ──────────────────────────────────────────────────────────────
  {
    displayName: 'Coupon ID',
    name: 'couponId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the coupon to update',
    displayOptions: {
      show: {
        resource: ['coupon'],
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
    description: 'Fields to update on the coupon',
    displayOptions: {
      show: {
        resource: ['coupon'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Amount Off',
        name: 'amountOff',
        type: 'number',
        default: 0,
        description: 'Fixed discount amount in cents (e.g. 500 = $5.00)',
      },
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'The coupon code',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'An internal description for this coupon',
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 0,
        description: 'Maximum number of times this coupon can be used. Set to 0 for unlimited.',
      },
      {
        displayName: 'Offering IDs',
        name: 'offeringIds',
        type: 'string',
        default: '',
        description: 'Comma-separated list of ticket IDs this coupon applies to',
      },
      {
        displayName: 'Percent Off',
        name: 'percentOff',
        type: 'number',
        typeOptions: {
          minValue: 0,
          maxValue: 100,
        },
        default: 0,
        description: 'Percentage discount (0-100)',
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Access', value: 'access' },
          { name: 'Coded', value: 'coded' },
          { name: 'Hold', value: 'hold' },
          { name: 'Public', value: 'public' },
        ],
        default: 'coded',
        description: 'The type of coupon',
      },
    ],
  },

  // ─── Delete ──────────────────────────────────────────────────────────────
  {
    displayName: 'Coupon ID',
    name: 'couponId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the coupon to delete',
    displayOptions: {
      show: {
        resource: ['coupon'],
        operation: ['delete'],
      },
    },
  },
];
