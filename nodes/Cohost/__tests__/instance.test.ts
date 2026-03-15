import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Instance resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('getMany', () => {
    it('sends GET /events/:id/instances', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'getMany',
        eventId: 'evt-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/instances');
    });
  });

  describe('create', () => {
    it('sends POST /events/:id/instances with startDate', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'create',
        eventId: 'evt-123',
        startDate: '2024-06-01T10:00:00Z',
        additionalFields: { endDate: '2024-06-01T12:00:00Z' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/instances');
      expect(capturedCalls[0].body).toEqual({
        startDate: '2024-06-01T10:00:00Z',
        endDate: '2024-06-01T12:00:00Z',
      });
    });
  });

  describe('get', () => {
    it('sends GET /events/:id/instances/:instanceId', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'get',
        eventId: 'evt-123',
        instanceId: 'ins-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/instances/ins-456');
    });
  });

  describe('update', () => {
    it('sends PATCH /events/:id/instances/:instanceId with update fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'update',
        eventId: 'evt-123',
        instanceId: 'ins-456',
        updateFields: { startDate: '2024-06-02T10:00:00Z' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('PATCH');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/instances/ins-456');
      expect(capturedCalls[0].body).toEqual({ startDate: '2024-06-02T10:00:00Z' });
    });
  });

  describe('delete', () => {
    it('sends DELETE /events/:id/instances/:instanceId', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'delete',
        eventId: 'evt-123',
        instanceId: 'ins-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/instances/ins-456');
    });
  });

  describe('bulkCreate', () => {
    it('sends POST /events/:id/instances/bulk with instances array', async () => {
      const instances = [
        { startDate: '2024-06-01T10:00:00Z' },
        { startDate: '2024-06-08T10:00:00Z' },
      ];
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'bulkCreate',
        eventId: 'evt-123',
        instancesJson: JSON.stringify(instances),
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/instances/bulk');
      expect(capturedCalls[0].body).toEqual({ instances });
    });

    it('throws NodeOperationError when instancesJson is invalid JSON', async () => {
      const { executeFunctions } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'instance',
        operation: 'bulkCreate',
        eventId: 'evt-123',
        instancesJson: '{ invalid }',
      });

      await expect(node.execute.call(executeFunctions)).rejects.toThrow(
        'Instances (JSON) must be a valid JSON array.',
      );
    });
  });
});
