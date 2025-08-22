import { INodeProperties } from 'n8n-workflow';

// When the resource `Ingeation` is selected, this `operation` parameter will be shown.
export const RetrievalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: [
					'retrieval'
				],
			},
		},
		options: [
			{
				name: 'Get Context',
				value: 'getContext',
				description: 'Get context for a given prompt',
				action: 'Get context for a given prompt',
				routing: {
					request: {
						method: 'POST',
						url: '/retrieval',
						body: {
							workspaceId: '={{$parameter["workspaceId"]}}',
							knowledgeGraphId: '={{$parameter["knowledgeGraphId"]}}',
							prompt: '={{$parameter["prompt"]}}',
							limit: '={{$parameter["additionalFields.limit"] || 5}}',
							depth: '={{$parameter["additionalFields.depth"] || 1}}',
						},
					},
				},
				
			},
			{
				name: 'Get Answer',
				value: 'getAnswer',
				description: 'Answer a given prompt with context',
				action: 'Answer a given prompt with context',
				routing: {
					request: {
						method: 'POST',
						url: '/retrieval/answer',
						body: {
							workspaceId: '={{$parameter["workspaceId"]}}',
							knowledgeGraphId: '={{$parameter["knowledgeGraphId"]}}',
							prompt: '={{$parameter["prompt"]}}',
							limit: '={{$parameter["additionalFields.limit"] || 5}}',
							depth: '={{$parameter["additionalFields.depth"] || 1}}',
						},
					},
				},
				
			},
		],
		default: 'getContext',
	},
];

// Here we define what to show when the `retrieval` operation is selected.
// We do that by adding `operation: ["retrieval"]` to `displayOptions.show`
const GetContextOperation: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		description: 'The ID of the workspace that the context vault belongs to',
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getContext'],
			},
		},
		required: true,
	},
	{
		displayName: 'Context Vault ID',
		name: 'knowledgeGraphId',
		type: 'string',
		default: '',
		description: 'The ID of the vault that should be used to answer the question',
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getContext'],
			},
		},
		required: true,
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 5, // Large text box
		},
		default: '',
		description: 'The prompt to retrieve context for',
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getContext'],
			},
		},
		required: true,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getContext'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Depth',
				name: 'depth',
				type: 'number',
				default: 1,
				description: 'Depth of retrieval in knowledge graph',
			},
		],
	},
];


// Here we define what to show when the getAnswer Operation is selected.
// We do that by adding `operation: ["getAnswer"]` to `displayOptions.show`
const GetAnswerOperation: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		description: 'The ID of the workspace that the context vault belongs to',
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getAnswer'],
			},
		},
		required: true,
	},
	{
		displayName: 'Context Vault ID',
		name: 'knowledgeGraphId',
		type: 'string',
		default: '',
		description: 'The ID of the vault that should be used to answer the question',
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getAnswer'],
			},
		},
		required: true,
	},
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 5, // Large text box
		},
		default: '',
		description: 'The prompt to retrieve context for',
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getAnswer'],
			},
		},
		required: true,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['retrieval'],
				operation: ['getAnswer'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Depth',
				name: 'depth',
				type: 'number',
				default: 1,
				description: 'Depth of retrieval in knowledge graph',
			},
		],
	},
];

export const RetrievalFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                retrieval:getContext                                */
	/* -------------------------------------------------------------------------- */
	...GetContextOperation,

	/* -------------------------------------------------------------------------- */
	/*                              ingestion:websiteData                               */
	/* -------------------------------------------------------------------------- */
	...GetAnswerOperation,
];
