import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Analytics resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('getStats', () => {
    it('sends GET /events/:id/stats', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'analytics',
        operation: 'getStats',
        eventId: 'evt-123',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/stats');
    });
  });

  describe('export', () => {
    it('sends GET /events/:id/export with format=json query param', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'analytics',
        operation: 'export',
        eventId: 'evt-123',
        format: 'json',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/export');
      expect(capturedCalls[0].qs).toEqual({ format: 'json' });
    });

    it('sends GET /events/:id/export with format=csv query param', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'analytics',
        operation: 'export',
        eventId: 'evt-123',
        format: 'csv',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].qs).toEqual({ format: 'csv' });
    });
  });
});
