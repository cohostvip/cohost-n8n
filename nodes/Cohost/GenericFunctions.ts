import type { IExecuteFunctions, IHookFunctions, IWebhookFunctions, IHttpRequestMethods, IRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { API_BASE } from './consts';

export async function cohostApiRequest(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: object = {},
  qs: Record<string, string | number> = {},
): Promise<any> {
  const credentials = await this.getCredentials('cohostApi');
  const apiKey = credentials.apiKey as string;

  const options: IRequestOptions = {
    method,
    qs,
    uri: `${API_BASE}${endpoint}`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  if (Object.keys(body).length > 0) {
    options.body = body;
  }

  const response = await this.helpers.request(options);
  return unwrapResponse(this, response);
}

/**
 * Strip undefined and empty-string values from an object so that
 * PATCH requests only send fields that were actually filled in.
 */
export function removeEmpty(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '' && v !== null),
  );
}

/**
 * API request helper for webhook trigger nodes (IHookFunctions / IWebhookFunctions context).
 */
export async function cohostWebhookApiRequest(
  this: IHookFunctions | IWebhookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: object = {},
  qs: Record<string, string | number> = {},
): Promise<any> {
  const credentials = await this.getCredentials('cohostApi');
  const apiKey = credentials.apiKey as string;

  const options: IRequestOptions = {
    method,
    qs,
    uri: `${API_BASE}${endpoint}`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  if (Object.keys(body).length > 0) {
    options.body = body;
  }

  const response = await this.helpers.request(options);
  return unwrapResponse(this, response);
}

function unwrapResponse(ctx: { getNode: () => any }, response: any): any {
  if (response && typeof response === 'object' && 'data' in response) {
    if (response.status === 'error') {
      throw new NodeOperationError(ctx.getNode(), response.message || 'API returned an error');
    }
    return response.data;
  }

  if (response?.status === 'error') {
    throw new NodeOperationError(ctx.getNode(), response.message || 'API returned an error');
  }

  return response;
}
