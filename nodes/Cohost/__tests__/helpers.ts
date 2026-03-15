/**
 * Test helpers for mocking n8n IExecuteFunctions context.
 */

export type MockCallArgs = { method: string; endpoint: string; body?: object; qs?: object };

/**
 * Creates a minimal mock of IExecuteFunctions used by cohostApiRequest and the node.
 * Records all calls to `cohostApiRequest` via the `mockRequest` spy.
 */
export function createMockExecuteFunctions(
  params: Record<string, any>,
  mockResponse: any = { id: 'test-id' },
): {
  executeFunctions: any;
  capturedCalls: MockCallArgs[];
} {
  const capturedCalls: MockCallArgs[] = [];

  const executeFunctions: any = {
    getInputData: () => [{ json: {} }],
    getNodeParameter: (name: string, _index: number, fallback?: any) => {
      if (name in params) return params[name];
      return fallback;
    },
    getNode: () => ({ name: 'Cohost', typeVersion: 1 }),
    getCredentials: async (_credName: string) => ({
      apiKey: 'test-api-key',
      baseUrl: 'https://api.cohost.vip',
    }),
    helpers: {
      request: async (options: any) => {
        capturedCalls.push({
          method: options.method,
          endpoint: options.uri.replace('https://api.cohost.vip/v1', ''),
          body: options.body,
          qs: options.qs,
        });
        return mockResponse;
      },
      httpRequestWithAuthentication: async (_credName: string, options: any) => {
        capturedCalls.push({
          method: options.method,
          endpoint: options.url.replace('https://api.cohost.vip/v1', ''),
          body: options.body,
          qs: options.qs,
        });
        return mockResponse;
      },
    },
  };

  return { executeFunctions, capturedCalls };
}
