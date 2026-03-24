import type { ICredentialType, INodeProperties } from 'n8n-workflow';
import { BASE_URL } from '../nodes/Cohost/consts';

export class CohostApi implements ICredentialType {
  name = 'cohostApi';

  displayName = 'Cohost API';

  documentationUrl = 'https://docs.cohost.vip/api';

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'The API key for authenticating with the Cohost API',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: BASE_URL,
      description: 'The base URL for the Cohost API. Change only for self-hosted instances.',
    },
  ];
}
