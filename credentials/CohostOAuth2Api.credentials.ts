import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class CohostOAuth2Api implements ICredentialType {
  name = 'cohostOAuth2Api';

  extends = ['oAuth2Api'];

  displayName = 'Cohost OAuth2 API';

  documentationUrl = 'https://docs.cohost.vip/oauth';

  properties: INodeProperties[] = [
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'string',
      default: 'https://api.cohost.vip/oauth/authorize',
      required: true,
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'string',
      default: 'https://api.cohost.vip/oauth/token',
      required: true,
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'string',
      default: 'events:read events:write orders:read orders:write tickets:read',
      description: 'Space-separated list of OAuth2 scopes to request',
    },
    {
      displayName: 'Auth URI Query Parameters',
      name: 'authQueryParameters',
      type: 'string',
      default: '',
      description: 'Additional query parameters to include in the authorization URI',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'header',
    },
  ];
}
