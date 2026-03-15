import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Event resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('create', () => {
    it('sends POST /events with event body', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'create',
        name: 'My Event',
        additionalFields: { timezone: 'America/New_York', status: 'draft' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls).toHaveLength(1);
      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events');
      expect(capturedCalls[0].body).toEqual({
        event: { name: 'My Event', timezone: 'America/New_York', status: 'draft' },
      });
    });

    it('omits empty additional fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'create',
        name: 'Minimal Event',
        additionalFields: {},
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({ event: { name: 'Minimal Event' } });
    });
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

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events');
    });
  });

  describe('update', () => {
    it('sends PATCH /events/:id with event wrapper', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'update',
        eventId: 'evt-123',
        updateFields: { name: 'Updated Name', status: 'live' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('PATCH');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123');
      expect(capturedCalls[0].body).toEqual({ event: { name: 'Updated Name', status: 'live' } });
    });
  });

  describe('delete', () => {
    it('sends DELETE /events/:id', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'delete',
        eventId: 'evt-123',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123');
    });
  });

  describe('clone', () => {
    it('sends POST /events/:id/clone with overrides', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'clone',
        eventId: 'evt-123',
        overrides: { name: 'Cloned Event' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/clone');
      expect(capturedCalls[0].body).toEqual({ name: 'Cloned Event' });
    });

    it('sends POST /events/:id/clone with empty body when no overrides', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'clone',
        eventId: 'evt-123',
        overrides: {},
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/clone');
    });
  });

  describe('setLocation', () => {
    it('sends POST /events/:id/set-location with location data', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'setLocation',
        eventId: 'evt-123',
        locationName: 'Madison Square Garden',
        additionalFields: { city: 'New York', state: 'NY', country: 'US' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/set-location');
      expect(capturedCalls[0].body).toEqual({
        name: 'Madison Square Garden',
        city: 'New York',
        state: 'NY',
        country: 'US',
      });
    });
  });

  describe('getBarcodes', () => {
    it('sends GET /events/:id/barcodes', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'event',
        operation: 'getBarcodes',
        eventId: 'evt-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/barcodes');
    });
  });
});
