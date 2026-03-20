import type { IExecuteFunctions, IHookFunctions, IWebhookFunctions, IPollFunctions, IHttpRequestMethods, IRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function cohostApiRequest(
  this: IExecuteFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: object = {},
  qs: Record<string, string | number> = {},
): Promise<any> {
  const authentication = this.getNodeParameter('authentication', 0) as string;

  const options: IRequestOptions = {
    method,
    qs,
    uri: '',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  if (Object.keys(body).length > 0) {
    options.body = body;
  }

  let response: any;

  if (authentication === 'oAuth2') {
    const credentials = await this.getCredentials('cohostOAuth2Api');
    const baseUrl = ((credentials.baseUrl as string) || 'https://api.cohost.vip').replace(/\/+$/, '');
    options.uri = `${baseUrl}/v1${endpoint}`;
    response = await this.helpers.httpRequestWithAuthentication.call(
      this,
      'cohostOAuth2Api',
      {
        method,
        url: options.uri,
        qs,
        body: options.body,
        headers: options.headers as Record<string, string>,
        json: true,
      },
    );
  } else {
    // apiKey authentication
    const credentials = await this.getCredentials('cohostApi');
    const baseUrl = ((credentials.baseUrl as string) || 'https://api.cohost.vip').replace(/\/+$/, '');
    const apiKey = credentials.apiKey as string;

    options.uri = `${baseUrl}/v1${endpoint}`;
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${apiKey}`,
    };

    response = await this.helpers.request(options);
  }

  // Unwrap the { status: "ok", data: ... } envelope
  if (response && typeof response === 'object' && 'data' in response) {
    // Check for API-level errors before returning
    if (response.status === 'error') {
      throw new NodeOperationError(this.getNode(), response.message || 'API returned an error');
    }
    return response.data;
  }

  // Check for top-level API error responses without a data field
  if (response?.status === 'error') {
    throw new NodeOperationError(this.getNode(), response.message || 'API returned an error');
  }

  return response;
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
 * Always uses API Key authentication.
 */
export async function cohostWebhookApiRequest(
  this: IHookFunctions | IWebhookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: object = {},
  qs: Record<string, string | number> = {},
): Promise<any> {
  const credentials = await this.getCredentials('cohostApi');
  const baseUrl = ((credentials.baseUrl as string) || 'https://api.cohost.vip').replace(/\/+$/, '');
  const apiKey = credentials.apiKey as string;

  const options: IRequestOptions = {
    method,
    qs,
    uri: `${baseUrl}/v1${endpoint}`,
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

  if (response && typeof response === 'object' && 'data' in response) {
    if (response.status === 'error') {
      throw new NodeOperationError(this.getNode(), response.message || 'API returned an error');
    }
    return response.data;
  }

  if (response?.status === 'error') {
    throw new NodeOperationError(this.getNode(), response.message || 'API returned an error');
  }

  return response;
}
