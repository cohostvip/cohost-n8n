import type { ICredentialType, INodeProperties } from 'n8n-workflow';
import { API_BASE } from '../nodes/Cohost/consts';

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
      default: `${API_BASE}/oauth/authorize`,
      required: true,
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'string',
      default: `${API_BASE}/oauth/token`,
      required: true,
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'string',
      default: 'events:read orders:read',
      description: 'Space-separated list of OAuth2 scopes to request',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'header',
    },
  ];
}
