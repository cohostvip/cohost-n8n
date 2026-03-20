import type {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IPollFunctions,
} from 'n8n-workflow';

import { cohostPollApiRequest } from './GenericFunctions';

export class CohostTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cohost Trigger',
    name: 'cohostTrigger',
    icon: 'file:cohost.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["resource"]}}',
    description:
      'Polls Cohost for new attendees, orders, or events and triggers workflows automatically',
    defaults: {
      name: 'Cohost Trigger',
    },
    polling: true,
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'cohostApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'New Attendee',
            value: 'attendee',
            description: 'Trigger when a new attendee registers for an event',
          },
          {
            name: 'New Order',
            value: 'order',
            description: 'Trigger when a new order is placed for an event',
          },
          {
            name: 'New Event',
            value: 'event',
            description: 'Trigger when a new event is created',
          },
        ],
        default: 'attendee',
        description: 'What to watch for',
      },
      {
        displayName: 'Event ID',
        name: 'eventId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the event to watch',
        displayOptions: {
          show: {
            resource: ['attendee', 'order'],
          },
        },
      },
    ],
  };

  async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
    const resource = this.getNodeParameter('resource') as string;
    const webhookData = this.getWorkflowStaticData('node');
    const now = new Date().toISOString();
    const lastPoll = (webhookData.lastPollTime as string) || now;

    let endpoint: string;
    const qs: Record<string, string | number> = { since: lastPoll };

    if (resource === 'attendee') {
      const eventId = this.getNodeParameter('eventId') as string;
      endpoint = `/events/${eventId}/attendees`;
    } else if (resource === 'order') {
      const eventId = this.getNodeParameter('eventId') as string;
      endpoint = `/events/${eventId}/orders`;
    } else {
      // event
      endpoint = '/events';
    }

    const responseData = await cohostPollApiRequest.call(this, 'GET', endpoint, {}, qs);

    // Update last poll time after successful request
    webhookData.lastPollTime = now;

    const items: IDataObject[] = Array.isArray(responseData) ? responseData : [];

    if (items.length === 0) {
      return null;
    }

    return [items.map((item) => ({ json: item }))];
  }
}
