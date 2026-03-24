import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Order resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('get', () => {
    it('sends GET /orders/:id', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'order',
        operation: 'get',
        orderId: 'ord-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls).toHaveLength(1);
      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/orders/ord-456');
    });
  });

  describe('getMany', () => {
    it('sends GET /orders with no filters', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'order',
        operation: 'getMany',
        filters: {},
      }, [{ id: 'ord-1' }, { id: 'ord-2' }]);

      const result = await node.execute.call(executeFunctions);

      expect(capturedCalls).toHaveLength(1);
      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/orders');
      expect(capturedCalls[0].qs).toEqual({});
      expect(result[0]).toHaveLength(2);
    });

    it('sends GET /orders with limit and startAfter', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'order',
        operation: 'getMany',
        filters: { limit: 10, startAfter: 'ord-100' },
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].qs).toEqual({ limit: 10, startAfter: 'ord-100' });
    });
  });
});
