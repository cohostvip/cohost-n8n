import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { cohostApiRequest } from './GenericFunctions';
import { eventFields, eventOperations, orderFields, orderOperations } from './descriptions';

export class Cohost implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cohost',
    name: 'cohost',
    icon: 'file:cohost.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Manage events and orders on the Cohost event management platform',
    defaults: {
      name: 'Cohost',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'cohostApi',
        required: false,
        displayOptions: {
          show: {
            authentication: ['apiKey'],
          },
        },
      },
      {
        name: 'cohostOAuth2Api',
        required: false,
        displayOptions: {
          show: {
            authentication: ['oAuth2'],
          },
        },
      },
    ],
    properties: [
      // ─── Authentication ───────────────────────────────────────────────────
      {
        displayName: 'Authentication',
        name: 'authentication',
        type: 'options',
        options: [
          {
            name: 'API Key',
            value: 'apiKey',
          },
          {
            name: 'OAuth2',
            value: 'oAuth2',
          },
        ],
        default: 'apiKey',
        description: 'The authentication method to use',
      },

      // ─── Resource ─────────────────────────────────────────────────────────
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Event',
            value: 'event',
          },
          {
            name: 'Order',
            value: 'order',
          },
        ],
        default: 'event',
        description: 'The resource to operate on',
      },

      // ─── Operations & Fields ──────────────────────────────────────────────
      ...eventOperations,
      ...eventFields,
      ...orderOperations,
      ...orderFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      let responseData: any;

      if (resource === 'event') {
        if (operation === 'get') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}`);
        } else if (operation === 'getMany') {
          responseData = await cohostApiRequest.call(this, 'GET', '/events');
        }
      } else if (resource === 'order') {
        if (operation === 'get') {
          const orderId = this.getNodeParameter('orderId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/orders/${orderId}`);
        } else if (operation === 'getMany') {
          const filters = this.getNodeParameter('filters', i) as Record<string, any>;
          const qs: Record<string, string | number> = {};
          if (filters.limit) qs.limit = filters.limit as number;
          if (filters.startAfter) qs.startAfter = filters.startAfter as string;
          responseData = await cohostApiRequest.call(this, 'GET', '/orders', {}, qs);
        }
      }

      if (Array.isArray(responseData)) {
        returnData.push(...responseData.map((d: IDataObject) => ({ json: d })));
      } else {
        returnData.push({ json: (responseData ?? {}) as IDataObject });
      }
    }

    return [returnData];
  }
}
