import type {
  IHookFunctions,
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from 'n8n-workflow';

import { cohostWebhookApiRequest } from './GenericFunctions';

export class CohostTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cohost Trigger',
    name: 'cohostTrigger',
    icon: 'file:cohost.png',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["events"].join(", ")}}',
    description:
      'Starts a workflow when Cohost events occur (orders, attendees, tickets, etc.)',
    defaults: {
      name: 'Cohost Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'cohostApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        required: true,
        default: [],
        description: 'The events to subscribe to',
        options: [
          // ─── Order ───────────────────────────────────────────────────
          {
            name: 'Order Created',
            value: 'order.created',
          },
          {
            name: 'Order Placed',
            value: 'order.placed',
          },
          {
            name: 'Order Updated',
            value: 'order.updated',
          },
          {
            name: 'Order Refunded',
            value: 'order.refunded',
          },
          {
            name: 'Order Confirmation Requested',
            value: 'order.confirmation-requested',
          },

          // ─── Ticket / Offering ───────────────────────────────────────
          {
            name: 'Ticket Created',
            value: 'offering.created',
          },
          {
            name: 'Ticket Updated',
            value: 'offering.updated',
          },
          {
            name: 'Ticket Deleted',
            value: 'offering.deleted',
          },

          // ─── Event ───────────────────────────────────────────────────
          {
            name: 'Event Created',
            value: 'event.created',
          },
          {
            name: 'Event Updated',
            value: 'event.updated',
          },
          {
            name: 'Event Published',
            value: 'event.published',
          },
          {
            name: 'Event Deleted',
            value: 'event.deleted',
          },

          // ─── Attendee ────────────────────────────────────────────────
          {
            name: 'Attendee Registered',
            value: 'attendee.created',
          },
          {
            name: 'Attendee Checked In',
            value: 'attendee.checked_in',
          },
          {
            name: 'Attendee Removed',
            value: 'attendee.deleted',
          },

          // ─── Payment ─────────────────────────────────────────────────
          {
            name: 'Payment Completed',
            value: 'payment.completed',
          },
          {
            name: 'Payment Failed',
            value: 'payment.failed',
          },
        ],
      },
      {
        displayName: 'Event IDs',
        name: 'eventIds',
        type: 'string',
        default: '',
        description:
          'Comma-separated list of Event IDs to scope the webhook to. Leave empty to receive events for all your events.',
        placeholder: 'e.g. evt_abc123, evt_def456',
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookUrl = this.getNodeWebhookUrl('default') as string;

        if (webhookData.webhookId) {
          try {
            const webhook = await cohostWebhookApiRequest.call(
              this,
              'GET',
              `/webhooks/${webhookData.webhookId}`,
            );
            if (webhook && webhook.url === webhookUrl) {
              return true;
            }
          } catch {
            // Webhook no longer exists on the API side
          }
          // Clean up stale reference
          delete webhookData.webhookId;
        }

        return false;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const events = this.getNodeParameter('events') as string[];
        const eventIdsRaw = this.getNodeParameter('eventIds', '') as string;

        const body: Record<string, any> = {
          url: webhookUrl,
          events,
        };

        if (eventIdsRaw && eventIdsRaw.trim().length > 0) {
          body.eventIds = eventIdsRaw
            .split(',')
            .map((id: string) => id.trim())
            .filter((id: string) => id.length > 0);
        }

        const webhook = await cohostWebhookApiRequest.call(
          this,
          'POST',
          '/webhooks',
          body,
        );

        const webhookData = this.getWorkflowStaticData('node');
        webhookData.webhookId = webhook.id;

        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');

        if (webhookData.webhookId) {
          try {
            await cohostWebhookApiRequest.call(
              this,
              'DELETE',
              `/webhooks/${webhookData.webhookId}`,
            );
          } catch {
            // Ignore errors during cleanup — webhook may already be gone
          }
          delete webhookData.webhookId;
        }

        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    const body = req.body as Record<string, any>;

    return {
      workflowData: [this.helpers.returnJsonArray(body)],
    };
  }
}
