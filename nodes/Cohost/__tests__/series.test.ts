import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Series resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('create', () => {
    it('sends POST /events/series with name', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'series',
        operation: 'create',
        name: 'Summer Series',
        additionalFields: { timezone: 'America/Chicago' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/series');
      expect(capturedCalls[0].body).toEqual({
        name: 'Summer Series',
        timezone: 'America/Chicago',
      });
    });
  });

  describe('createInstances', () => {
    it('sends POST /events/series/:id/instances with parsed instances array', async () => {
      const instances = [{ startDate: '2024-06-01T10:00:00Z' }, { startDate: '2024-06-08T10:00:00Z' }];
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'series',
        operation: 'createInstances',
        seriesId: 'ser-123',
        instancesJson: JSON.stringify(instances),
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/series/ser-123/instances');
      expect(capturedCalls[0].body).toEqual({ instances });
    });

    it('throws NodeOperationError when instancesJson is invalid JSON', async () => {
      const { executeFunctions } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'series',
        operation: 'createInstances',
        seriesId: 'ser-123',
        instancesJson: 'not-json',
      });

      await expect(node.execute.call(executeFunctions)).rejects.toThrow(
        'Instances (JSON) must be a valid JSON array.',
      );
    });
  });

  describe('getInstances', () => {
    it('sends GET /events/series/:id/instances', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'series',
        operation: 'getInstances',
        seriesId: 'ser-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/series/ser-123/instances');
    });
  });

  describe('update', () => {
    it('sends PATCH /events/series/:id with update fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'series',
        operation: 'update',
        seriesId: 'ser-123',
        updateFields: { name: 'Updated Series', timezone: 'America/Los_Angeles' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('PATCH');
      expect(capturedCalls[0].endpoint).toBe('/events/series/ser-123');
      expect(capturedCalls[0].body).toEqual({
        name: 'Updated Series',
        timezone: 'America/Los_Angeles',
      });
    });
  });
});
