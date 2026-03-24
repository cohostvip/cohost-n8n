import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Event resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('get', () => {
    it('sends GET /events/:id', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'get',
        eventId: 'evt-123',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls).toHaveLength(1);
      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123');
    });
  });

  describe('getMany', () => {
    it('sends GET /events', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'getMany',
      }, [{ id: 'evt-1' }, { id: 'evt-2' }]);

      const result = await node.execute.call(executeFunctions);

      expect(capturedCalls).toHaveLength(1);
      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events');
      expect(result[0]).toHaveLength(2);
    });
  });
});
