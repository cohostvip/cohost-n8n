import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Table resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('getMany', () => {
    it('sends GET /events/:id/tables', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'table',
        operation: 'getMany',
        eventId: 'evt-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/tables');
    });
  });

  describe('create', () => {
    it('sends POST /events/:id/tables with table wrapper', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'table',
        operation: 'create',
        eventId: 'evt-123',
        name: 'VIP Table 1',
        capacity: 8,
        additionalFields: { price: 50000, minGuests: 2 },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/tables');
      expect(capturedCalls[0].body).toEqual({
        table: { name: 'VIP Table 1', capacity: 8, price: 50000, minGuests: 2 },
      });
    });
  });

  describe('update', () => {
    it('sends PATCH /events/:id/tables/:tableId with table wrapper', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'table',
        operation: 'update',
        eventId: 'evt-123',
        tableId: 'tbl-456',
        updateFields: { capacity: 10, price: 75000 },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('PATCH');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/tables/tbl-456');
      expect(capturedCalls[0].body).toEqual({ table: { capacity: 10, price: 75000 } });
    });
  });

  describe('delete', () => {
    it('sends DELETE /events/:id/tables/:tableId', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'table',
        operation: 'delete',
        eventId: 'evt-123',
        tableId: 'tbl-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/tables/tbl-456');
    });
  });
});
