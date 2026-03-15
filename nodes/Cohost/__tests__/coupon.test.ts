import { Cohost } from '../Cohost.node';
import { createMockExecuteFunctions } from './helpers';

describe('Coupon resource', () => {
  let node: Cohost;

  beforeEach(() => {
    node = new Cohost();
  });

  describe('create', () => {
    it('sends POST /coupons with code and type', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'create',
        code: 'SAVE20',
        type: 'coded',
        additionalFields: {},
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls).toHaveLength(1);
      expect(capturedCalls[0].method).toBe('POST');
      expect(capturedCalls[0].endpoint).toBe('/coupons');
      expect(capturedCalls[0].body).toEqual({ code: 'SAVE20', type: 'coded' });
    });

    it('parses offeringIds from comma-separated string to array', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'create',
        code: 'TICKETS',
        type: 'access',
        additionalFields: { offeringIds: 'tkt-1, tkt-2, tkt-3' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({
        code: 'TICKETS',
        type: 'access',
        offeringIds: ['tkt-1', 'tkt-2', 'tkt-3'],
      });
    });

    it('converts eventId to contextIds array', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'create',
        code: 'EVENT10',
        type: 'public',
        additionalFields: { eventId: 'evt-abc' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({
        code: 'EVENT10',
        type: 'public',
        contextIds: ['evt-abc'],
      });
    });

    it('includes optional numeric fields when provided', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'create',
        code: 'HALF',
        type: 'coded',
        additionalFields: { percentOff: 50, limit: 100, description: 'Half off' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({
        code: 'HALF',
        type: 'coded',
        percentOff: 50,
        limit: 100,
        description: 'Half off',
      });
    });
  });

  describe('update', () => {
    it('sends PATCH /coupons/:id with update fields', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'update',
        couponId: 'cpn-123',
        updateFields: { code: 'NEWCODE', percentOff: 25 },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('PATCH');
      expect(capturedCalls[0].endpoint).toBe('/coupons/cpn-123');
      expect(capturedCalls[0].body).toEqual({ code: 'NEWCODE', percentOff: 25 });
    });

    it('parses offeringIds from comma-separated string to array in update', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'update',
        couponId: 'cpn-456',
        updateFields: { offeringIds: 'tkt-a, tkt-b' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({ offeringIds: ['tkt-a', 'tkt-b'] });
    });

    it('omits empty string fields via removeEmpty', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'update',
        couponId: 'cpn-789',
        updateFields: { code: 'VALID', description: '' },
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].body).toEqual({ code: 'VALID' });
    });
  });

  describe('getMany', () => {
    it('sends GET /coupons with no filters', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'getMany',
        filters: {},
      }, [{ id: 'cpn-1' }, { id: 'cpn-2' }]);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/coupons');
      expect(capturedCalls[0].qs).toEqual({});
    });

    it('sends GET /coupons with eventId filter', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'getMany',
        filters: { eventId: 'evt-123' },
      }, []);

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('GET');
      expect(capturedCalls[0].endpoint).toBe('/coupons');
      expect(capturedCalls[0].qs).toEqual({ eventId: 'evt-123' });
    });
  });

  describe('delete', () => {
    it('sends DELETE /coupons/:id', async () => {
      const { executeFunctions, capturedCalls } = createMockExecuteFunctions({
        authentication: 'apiKey',
        resource: 'coupon',
        operation: 'delete',
        couponId: 'cpn-999',
      });

      await node.execute.call(executeFunctions);

      expect(capturedCalls[0].method).toBe('DELETE');
      expect(capturedCalls[0].endpoint).toBe('/coupons/cpn-999');
    });
  });
});
