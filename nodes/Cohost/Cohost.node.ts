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
  analyticsFields,
  analyticsOperations,
  attendeeFields,
  attendeeOperations,
  channelFields,
  channelOperations,
  couponFields,
  couponOperations,
  eventFields,
  eventOperations,
  instanceFields,
  instanceOperations,
  purchaseGroupFields,
  purchaseGroupOperations,
  seriesFields,
  seriesOperations,
  tableFields,
  tableOperations,
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
            name: 'Analytics',
            value: 'analytics',
          },
          {
            name: 'Attendee',
            value: 'attendee',
          },
          {
            name: 'Channel',
            value: 'channel',
          },
          {
            name: 'Coupon',
            value: 'coupon',
          },
          {
            name: 'Event',
            value: 'event',
          },
          {
            name: 'Event Instance',
            value: 'instance',
          },
          {
            name: 'Purchase Group',
            value: 'purchaseGroup',
          },
          {
            name: 'Series',
            value: 'series',
          },
          {
            name: 'Table',
            value: 'table',
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
      ...analyticsOperations,
      ...attendeeOperations,
      ...channelOperations,
      ...couponOperations,
      ...eventOperations,
      ...instanceOperations,
      ...purchaseGroupOperations,
      ...seriesOperations,
      ...tableOperations,
      ...ticketOperations,

      // ─── Fields ───────────────────────────────────────────────────────────
      ...analyticsFields,
      ...attendeeFields,
      ...channelFields,
      ...couponFields,
      ...eventFields,
      ...instanceFields,
      ...purchaseGroupFields,
      ...seriesFields,
      ...tableFields,
      ...ticketFields,
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
        if (operation === 'create') {
          const name = this.getNodeParameter('name', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            '/events',
            { event: removeEmpty({ name, ...additionalFields }) },
          );
        } else if (operation === 'get') {
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
        } else if (operation === 'clone') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const overrides = this.getNodeParameter('overrides', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/clone`,
            Object.keys(overrides).length > 0 ? removeEmpty(overrides) : {},
          );
        } else if (operation === 'setLocation') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const locationName = this.getNodeParameter('locationName', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/set-location`,
            removeEmpty({ name: locationName, ...additionalFields }),
          );
        } else if (operation === 'getBarcodes') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}/barcodes`);
        }
      }

      // ─── Attendee ──────────────────────────────────────────────────────
      else if (resource === 'attendee') {
        if (operation === 'getMany') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}/attendees`);
        } else if (operation === 'create') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const email = this.getNodeParameter('email', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/attendees`,
            removeEmpty({ email, ...additionalFields }),
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const attendeeId = this.getNodeParameter('attendeeId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/attendees/${attendeeId}`,
          );
        } else if (operation === 'bulkDelete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const rawIds = this.getNodeParameter('attendeeIds', i) as string;
          const attendeeIds = rawIds
            .split(',')
            .map((id: string) => id.trim())
            .filter((id: string) => id.length > 0);

          if (attendeeIds.length === 0) {
            throw new NodeOperationError(
              this.getNode(),
              'Bulk Delete requires at least one attendee ID.',
              { itemIndex: i },
            );
          }

          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/attendees`,
            { attendeeIds },
          );
        }
      }

      // ─── Series ────────────────────────────────────────────────────────
      else if (resource === 'series') {
        if (operation === 'create') {
          const name = this.getNodeParameter('name', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            '/events/series',
            removeEmpty({ name, ...additionalFields }),
          );
        } else if (operation === 'createInstances') {
          const seriesId = this.getNodeParameter('seriesId', i) as string;
          const instancesJson = this.getNodeParameter('instancesJson', i) as string;
          let instances: unknown[];
          try {
            instances = JSON.parse(instancesJson) as unknown[];
          } catch {
            throw new NodeOperationError(
              this.getNode(),
              'Instances (JSON) must be a valid JSON array.',
              { itemIndex: i },
            );
          }
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/series/${seriesId}/instances`,
            { instances },
          );
        } else if (operation === 'getInstances') {
          const seriesId = this.getNodeParameter('seriesId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/series/${seriesId}/instances`);
        } else if (operation === 'update') {
          const seriesId = this.getNodeParameter('seriesId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/series/${seriesId}`,
            removeEmpty(updateFields),
          );
        }
      }

      // ─── Instance ──────────────────────────────────────────────────────
      else if (resource === 'instance') {
        if (operation === 'getMany') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}/instances`);
        } else if (operation === 'create') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const startDate = this.getNodeParameter('startDate', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/instances`,
            removeEmpty({ startDate, ...additionalFields }),
          );
        } else if (operation === 'get') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const instanceId = this.getNodeParameter('instanceId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'GET',
            `/events/${eventId}/instances/${instanceId}`,
          );
        } else if (operation === 'update') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const instanceId = this.getNodeParameter('instanceId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/${eventId}/instances/${instanceId}`,
            removeEmpty(updateFields),
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const instanceId = this.getNodeParameter('instanceId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/instances/${instanceId}`,
          );
        } else if (operation === 'bulkCreate') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const instancesJson = this.getNodeParameter('instancesJson', i) as string;
          let instances: unknown[];
          try {
            instances = JSON.parse(instancesJson) as unknown[];
          } catch {
            throw new NodeOperationError(
              this.getNode(),
              'Instances (JSON) must be a valid JSON array.',
              { itemIndex: i },
            );
          }
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/instances/bulk`,
            { instances },
          );
        }
      }

      // ─── Table ─────────────────────────────────────────────────────────
      else if (resource === 'table') {
        if (operation === 'getMany') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}/tables`);
        } else if (operation === 'create') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const capacity = this.getNodeParameter('capacity', i) as number;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/tables`,
            { table: removeEmpty({ name, capacity, ...additionalFields }) },
          );
        } else if (operation === 'update') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const tableId = this.getNodeParameter('tableId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/${eventId}/tables/${tableId}`,
            { table: removeEmpty(updateFields) },
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const tableId = this.getNodeParameter('tableId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/tables/${tableId}`,
          );
        }
      }

      // ─── Channel ───────────────────────────────────────────────────────
      else if (resource === 'channel') {
        if (operation === 'getMany') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}/channels`);
        } else if (operation === 'create') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const channelType = this.getNodeParameter('channelType', i) as string;
          const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, any>;

          const body: Record<string, any> = { type: channelType };
          if (additionalFields.configJson) {
            try {
              body.config = JSON.parse(additionalFields.configJson as string) as Record<string, unknown>;
            } catch {
              throw new NodeOperationError(
                this.getNode(),
                'Config (JSON) must be a valid JSON object.',
                { itemIndex: i },
              );
            }
          }

          responseData = await cohostApiRequest.call(
            this,
            'POST',
            `/events/${eventId}/channels`,
            body,
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const channelId = this.getNodeParameter('channelId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/channels/${channelId}`,
          );
        }
      }

      // ─── Analytics ─────────────────────────────────────────────────────
      else if (resource === 'analytics') {
        if (operation === 'getStats') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(this, 'GET', `/events/${eventId}/stats`);
        } else if (operation === 'export') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const format = this.getNodeParameter('format', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'GET',
            `/events/${eventId}/export`,
            {},
            { format },
          );
        }
      }

      // ─── Purchase Group ────────────────────────────────────────────────
      else if (resource === 'purchaseGroup') {
        if (operation === 'getMany') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'GET',
            `/events/${eventId}/purchase-groups`,
          );
        } else if (operation === 'update') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const purchaseGroupId = this.getNodeParameter('purchaseGroupId', i) as string;
          const updateFields = this.getNodeParameter('updateFields', i) as Record<string, any>;
          responseData = await cohostApiRequest.call(
            this,
            'PATCH',
            `/events/${eventId}/purchase-groups/${purchaseGroupId}`,
            removeEmpty(updateFields),
          );
        } else if (operation === 'delete') {
          const eventId = this.getNodeParameter('eventId', i) as string;
          const purchaseGroupId = this.getNodeParameter('purchaseGroupId', i) as string;
          responseData = await cohostApiRequest.call(
            this,
            'DELETE',
            `/events/${eventId}/purchase-groups/${purchaseGroupId}`,
          );
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
