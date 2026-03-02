import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { cohostApiRequest, removeEmpty } from './GenericFunctions';
import {
  couponFields,
  couponOperations,
  eventFields,
  eventOperations,
  ticketFields,
  ticketOperations,
} from './descriptions';

export class Cohost implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cohost',
    name: 'cohost',
    icon: 'file:cohost.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Cohost event management platform',
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
            name: 'Coupon',
            value: 'coupon',
          },
          {
            name: 'Event',
            value: 'event',
          },
          {
            name: 'Ticket',
            value: 'ticket',
          },
        ],
        default: 'event',
        description: 'The resource to operate on',
      },

      // ─── Operations ───────────────────────────────────────────────────────
      ...eventOperations,
      ...ticketOperations,
      ...couponOperations,

      // ─── Fields ───────────────────────────────────────────────────────────
      ...eventFields,
      ...ticketFields,
      ...couponFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      let responseData: any;

      // ─── Event ─────────────────────────────────────────────────────────
      if (resource === 'event') {
        if (operation === 'get') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}`);
        } else if (operation === 'getMany') {
          responseData = await cohostApiRequest.call(this, 'GET', '/events');
        } else if (operation === 'update') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/${eventId}`,
            { event: removeEmpty(updateFields) },
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'DELETE', `/events/${eventId}`);
        }
      }

      // ─── Ticket ────────────────────────────────────────────────────────
      else if (resource === 'ticket') {
        if (operation === 'create') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const price = this.getNodeParameter('price', i) as number;
          const currency = this.getNodeParameter('currency', i) as string;
          const quantity = this.getNodeParameter('quantity', i) as number;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;

          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/tickets`,
            {
              ticket: removeEmpty({
                name,
                price,
                currency,
                quantity,
                ...additionalFields,
              }),
            },
          );
        } else if (operation === 'getMany') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const filters = this.getNodeParameter('filters', i) as Record<string, any>;
          const qs: Record<string, string | number> = {};
          if (filters.status && filters.status !== 'all') {
            qs.status = filters.status as string;
          }
          responseData = await cohostApiRequest.call(
            this,
            'GET',
            `/events/${eventId}/tickets`,
            {},
            qs,
          );
        } else if (operation === 'update') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const ticketId = this.getNodeParameter('ticketId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/${eventId}/tickets/${ticketId}`,
            { ticket: removeEmpty(updateFields) },
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const ticketId = this.getNodeParameter('ticketId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/tickets/${ticketId}`,
          );
        } else if (operation === 'quickUpdate') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const ticketId = this.getNodeParameter('ticketId', i) as string;
          const price = this.getNodeParameter('price', i, false) as number | undefined;
          const quantity = this.getNodeParameter('quantity', i, false) as number | undefined;
          const status = this.getNodeParameter('status', i) as string;

          const patchBody: Record<string, any> = {};
          if (price !== undefined && price !== null) patchBody.price = price;
          if (quantity !== undefined && quantity !== null) patchBody.quantity = quantity;
          if (status && status !== '') patchBody.status = status;

          if (Object.keys(patchBody).length === 0) {
            throw new NodeOperationError(
              this.getNode(),
              'Quick Update requires at least one field: price, quantity, or status.',
              { itemIndex: i },
            );
          }

          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/${eventId}/tickets/${ticketId}`,
            { ticket: patchBody },
          );
        }
      }

      // ─── Coupon ────────────────────────────────────────────────────────
      else if (resource === 'coupon') {
        if (operation === 'create') {
          const code = this.getNodeParameter('code', i) as string;
          const type = this.getNodeParameter('type', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;

          // Parse offeringIds from comma-separated string to array
          let offeringIds: string[] | undefined;
          if (additionalFields.offeringIds && typeof additionalFields.offeringIds === 'string') {
            offeringIds = additionalFields.offeringIds
              .split(',')
              .map((id: string) => id.trim())
              .filter((id: string) => id.length > 0);
          }

          // Wrap eventId into contextIds
          let contextIds: string[] | undefined;
          if (additionalFields.eventId) {
            contextIds = [additionalFields.eventId as string];
          }

          const body: Record<string, any> = removeEmpty({
            code,
            type,
            description: additionalFields.description,
            amountOff: additionalFields.amountOff,
            percentOff: additionalFields.percentOff,
            limit: additionalFields.limit,
          });

          if (offeringIds && offeringIds.length > 0) {
            body.offeringIds = offeringIds;
          }
          if (contextIds && contextIds.length > 0) {
            body.contextIds = contextIds;
          }

          responseData = await cohostApiRequest.call(this, 'POST', '/coupons', body);
        } else if (operation === 'getMany') {
          const filters = this.getNodeParameter('filters', i) as Record<string, any>;
          const qs: Record<string, string | number> = {};
          if (filters.eventId) {
            qs.eventId = filters.eventId as string;
          }
          responseData = await cohostApiRequest.call(this, 'GET', '/coupons', {}, qs);
        } else if (operation === 'update') {
          const couponId = this.getNodeParameter('couponId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;

          // Parse offeringIds if present
          const patchBody: Record<string, any> = { ...updateFields };
          if (patchBody.offeringIds && typeof patchBody.offeringIds === 'string') {
            patchBody.offeringIds = (patchBody.offeringIds as string)
              .split(',')
              .map((id: string) => id.trim())
              .filter((id: string) => id.length > 0);
          }

          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/coupons/${couponId}`,
            removeEmpty(patchBody),
          );
        } else if (operation === 'delete') {
          const couponId = this.getNodeParameter('couponId', i) as string;
          responseData = await cohostApiRequest.call(this, 'DELETE', `/coupons/${couponId}`);
        }
      }

      // Push results
      if (Array.isArray(responseData)) {
        returnData.push(...responseData.map((d: IDataObject) => ({ json: d })));
      } else {
        returnData.push({ json: (responseData ?? {}) as IDataObject });
      }
    }

    return [returnData];
  }
}
