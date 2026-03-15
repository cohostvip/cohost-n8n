import type { INodeProperties } from 'n8n-workflow';

export const attendeeOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['attendee'],
      },
    },
    options: [
      {
        name: 'Bulk Delete',
        value: 'bulkDelete',
        description: 'Delete multiple attendees at once',
        action: 'Bulk delete attendees',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new attendee for an event',
        action: 'Create an attendee',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an attendee from an event',
        action: 'Delete an attendee',
      },
      {
        name: 'Get Many',
        value: 'getMany',
        description: 'List all attendees for an event',
        action: 'Get many attendees',
      },
    ],
    default: 'getMany',
  },
];

export const attendeeFields: INodeProperties[] = [
  // ─── Get Many ────────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to list attendees for',
    displayOptions: {
      show: {
        resource: ['attendee'],
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
    description: 'The ID of the event to create an attendee for',
    displayOptions: {
      show: {
        resource: ['attendee'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'name@email.com',
    description: 'The email address of the attendee',
    displayOptions: {
      show: {
        resource: ['attendee'],
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
    description: 'Additional optional fields for the attendee',
    displayOptions: {
      show: {
        resource: ['attendee'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        description: 'The first name of the attendee',
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: 'The last name of the attendee',
      },
      {
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'The phone number of the attendee',
      },
      {
        displayName: 'Ticket ID',
        name: 'ticketId',
        type: 'string',
        default: '',
        description: 'The ticket type ID to assign to this attendee',
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
    description: 'The ID of the event the attendee belongs to',
    displayOptions: {
      show: {
        resource: ['attendee'],
        operation: ['delete'],
      },
    },
  },
  {
    displayName: 'Attendee ID',
    name: 'attendeeId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the attendee to delete',
    displayOptions: {
      show: {
        resource: ['attendee'],
        operation: ['delete'],
      },
    },
  },

  // ─── Bulk Delete ─────────────────────────────────────────────────────────
  {
    displayName: 'Event ID',
    name: 'eventId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event to bulk delete attendees from',
    displayOptions: {
      show: {
        resource: ['attendee'],
        operation: ['bulkDelete'],
      },
    },
  },
  {
    displayName: 'Attendee IDs',
    name: 'attendeeIds',
    type: 'string',
    required: true,
    default: '',
    description: 'Comma-separated list of attendee IDs to delete',
    displayOptions: {
      show: {
        resource: ['attendee'],
        operation: ['bulkDelete'],
      },
    },
  },
];
