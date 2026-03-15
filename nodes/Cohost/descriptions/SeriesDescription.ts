import type { INodeProperties } from 'n8n-workflow';

export const seriesOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['series'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new event series parent',
        action: 'Create a series',
      },
      {
        name: 'Create Instances',
        value: 'createInstances',
        description: 'Create instances for a series',
        action: 'Create series instances',
      },
      {
        name: 'Get Instances',
        value: 'getInstances',
        description: 'List all instances of a series',
        action: 'Get series instances',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update series metadata',
        action: 'Update a series',
      },
    ],
    default: 'getInstances',
  },
];

export const seriesFields: INodeProperties[] = [
  // ─── Create ──────────────────────────────────────────────────────────────
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the event series',
    displayOptions: {
      show: {
        resource: ['series'],
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
    description: 'Additional optional fields for the series',
    displayOptions: {
      show: {
        resource: ['series'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'A description for the series',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: '',
        description: 'The timezone for the series (e.g. America/New_York)',
      },
    ],
  },

  // ─── Create Instances ────────────────────────────────────────────────────
  {
    displayName: 'Series ID',
    name: 'seriesId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the series to create instances for',
    displayOptions: {
      show: {
        resource: ['series'],
        operation: ['createInstances'],
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
        resource: ['series'],
        operation: ['createInstances'],
      },
    },
  },

  // ─── Get Instances ───────────────────────────────────────────────────────
  {
    displayName: 'Series ID',
    name: 'seriesId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the series to list instances for',
    displayOptions: {
      show: {
        resource: ['series'],
        operation: ['getInstances'],
      },
    },
  },

  // ─── Update ──────────────────────────────────────────────────────────────
  {
    displayName: 'Series ID',
    name: 'seriesId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the series to update',
    displayOptions: {
      show: {
        resource: ['series'],
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
    description: 'Fields to update on the series',
    displayOptions: {
      show: {
        resource: ['series'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'A description for the series',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the series',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: '',
        description: 'The timezone for the series (e.g. America/New_York)',
      },
    ],
  },
];
