import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Attendee resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('getMany', () => {
    it('sends GET /events/:id/attendees', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'attendee',
        operation: 'getMany',
        eventId: 'evt-123',
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/attendees');
    });
  });

  describe('create', () => {
    it('sends POST /events/:id/attendees with email and optional fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'attendee',
        operation: 'create',
        eventId: 'evt-123',
        email: 'attendee@example.com',
        additionalFields: { firstName: 'Jane', lastName: 'Doe' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/attendees');
      expect(capturedCalls[0].body).toEqual({
        email: 'attendee@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
      });
    });

    it('sends POST with only required email when no additional fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'attendee',
        operation: 'create',
        eventId: 'evt-123',
        email: 'minimal@example.com',
        additionalFields: {},
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({ email: 'minimal@example.com' });
    });
  });

  describe('delete', () => {
    it('sends DELETE /events/:id/attendees/:attendeeId', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'attendee',
        operation: 'delete',
        eventId: 'evt-123',
        attendeeId: 'att-456',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/attendees/att-456');
    });
  });

  describe('bulkDelete', () => {
    it('sends DELETE /events/:id/attendees with attendeeIds array', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'attendee',
        operation: 'bulkDelete',
        eventId: 'evt-123',
        attendeeIds: 'att-1, att-2, att-3',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/events/evt-123/attendees');
      expect(capturedCalls[0].body).toEqual({ attendeeIds: ['att-1', 'att-2', 'att-3'] });
    });

    it('throws NodeOperationError when attendeeIds is empty', async () => {
      const { executeFunctions } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'attendee',
        operation: 'bulkDelete',
        eventId: 'evt-123',
        attendeeIds: '  ',
      });

      await expect(node.execute.call(executeFunctions)).rejects.toThrow(
        'Bulk Delete requires at least one attendee ID.',
      );
    });
  });
});
