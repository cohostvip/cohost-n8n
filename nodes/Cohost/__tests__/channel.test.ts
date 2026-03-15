import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Channel resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('getMany', () => {
    it('sends GET /events/:id/channels', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'channel',
        operation: 'getMany',
        eventId: 'evt-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/channels');
    });
  });

  describe('create (add)', () => {
    it('sends POST /events/:id/channels with channel type', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'channel',
        operation: 'create',
        eventId: 'evt-123',
        channelType: 'email',
        additionalFields: {},
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/channels');
      expect(capturedCalls[0].body).toEqual({ type: 'email' });
    });

    it('parses configJson and includes it in the body', async () => {
      const config = { templateId: 'tmpl-abc', from: 'noreply@example.com' };
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'channel',
        operation: 'create',
        eventId: 'evt-123',
        channelType: 'email',
        additionalFields: { configJson: JSON.stringify(config) },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({ type: 'email', config });
    });

    it('throws NodeOperationError when configJson is invalid JSON', async () => {
      const { executeFunctions } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'channel',
        operation: 'create',
        eventId: 'evt-123',
        channelType: 'email',
        additionalFields: { configJson: 'bad json' },
      });

      await expect(node.execute.call(executeFunctions)).rejects.toThrow(
        'Config (JSON) must be a valid JSON object.',
      );
    });
  });

  describe('delete (remove)', () => {
    it('sends DELETE /events/:id/channels/:channelId', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'channel',
        operation: 'delete',
        eventId: 'evt-123',
        channelId: 'chan-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/channels/chan-456');
    });
  });
});
