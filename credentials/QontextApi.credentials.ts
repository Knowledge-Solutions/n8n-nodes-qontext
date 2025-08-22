import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class QontextApi implements ICredentialType {
	name = 'qontextApi';
	displayName = 'Qontext API';
	documentationUrl = 'https://docs.qontext.ai/get_started';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: 'https://api.staging.qontext.ai',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.token}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			method: 'POST', // Required for validate-key
			baseURL: '={{$credentials?.domain}}',
			url: '/auth/validate-key',
			headers: {
				'X-API-Key': '={{$credentials?.token}}',
				'accept': '*/*',
			},
			body: {}, // Empty object to send POST with empty payload
		},
	};	
}
