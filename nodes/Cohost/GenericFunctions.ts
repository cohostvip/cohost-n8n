import type { IExecuteFunctions, IHttpRequestMethods, IRequestOptions } from 'n8n-workflow';

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
    options.uri = `https://api.cohost.vip/v1${endpoint}`;
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
    const baseUrl = (credentials.baseUrl as string) || 'https://api.cohost.vip';
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
    return response.data;
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
