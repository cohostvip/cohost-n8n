import type { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['order'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        description: 'Get an order by ID',
        action: 'Get an order',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'Get a list of orders',
        action: 'Get many orders',
      },
    ],
    default: 'getMany',
  },
];

export const orderFields: INodeProperties[] = [
  // ─── Get ─────────────────────────────────────────────────────────────────
  {
    displayName: 'Order ID',
    name: 'orderId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the order to retrieve',
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['get'],
      },
    },
  },

  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    description: 'Optional filters for the order list',
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 50,
        },
        default: 20,
        description: 'Maximum number of orders to return',
      },
      {
        displayName: 'Start After',
        name: 'startAfter',
        type: 'string',
        default: '',
        description: 'Order ID to start after (for pagination)',
      },
    ],
  },
];
