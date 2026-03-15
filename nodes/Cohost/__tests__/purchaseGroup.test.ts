import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('PurchaseGroup resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('getMany', () => {
    it('sends GET /events/:id/purchase-groups', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'purchaseGroup',
        operation: 'getMany',
        eventId: 'evt-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/purchase-groups');
    });
  });

  describe('update', () => {
    it('sends PATCH /events/:id/purchase-groups/:pgid with update fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'purchaseGroup',
        operation: 'update',
        eventId: 'evt-123',
        purchaseGroupId: 'pg-456',
        updateFields: { name: 'VIP Group', notes: 'Corporate booking' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('PATCH');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/purchase-groups/pg-456');
      expect(capturedCalls[0].body).toEqual({ name: 'VIP Group', notes: 'Corporate booking' });
    });
  });

  describe('delete', () => {
    it('sends DELETE /events/:id/purchase-groups/:pgid', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'purchaseGroup',
        operation: 'delete',
        eventId: 'evt-123',
        purchaseGroupId: 'pg-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/purchase-groups/pg-456');
    });
  });
});
