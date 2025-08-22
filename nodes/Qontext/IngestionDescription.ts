import { INodeProperties } from 'n8n-workflow';

// When the resource `Ingeation` is selected, this `operation` parameter will be shown.
export const IngestionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: [
					'ingestion'
				],
			},
		},
		options: [
			{
				name: 'Unstructured Text',
				value: 'unstructuredText',
				description: 'Ingest Unstructured Text',
				action: 'Ingest unstructured text',
				routing: {
                    request: {
                        method: 'POST',
                        url: '/ingestion/unstructured',
                        body: {
                            workspaceId: '={{$parameter["workspaceId"]}}',
                            knowledgeGraphId: '={{$parameter["knowledgeGraphId"]}}',
                            text: '={{$parameter["text"]}}',
                        },
                    },
                },
			},
			{
				name: 'Website Data',
				value: 'websiteData',
				description: 'Ingest data from a website',
				action: 'Ingest data from a website',
				routing: {
                    request: {
                        method: 'POST',
                        url: '/ingestion/website',
                        body: {
                            workspaceId: '={{$parameter["workspaceId"]}}',
                            knowledgeGraphId: '={{$parameter["knowledgeGraphId"]}}',
                            url: '={{$parameter["url"]}}',
							type: 'singlePage'
                        },
                    },
                },
			},
		],
		default: 'unstructuredText',
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const TextOperation: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		description: 'The ID of the workspace that the context vault belongs to',
		displayOptions: {
			show: {
				resource: ['ingestion'],
				operation: ['unstructuredText'],
			},
		},
		required: true,
	},
	{
		displayName: 'Context Vault ID',
		name: 'knowledgeGraphId',
		type: 'string',
		default: '',
		description: 'The ID of the vault that the data should be ingested into',
		displayOptions: {
			show: {
				resource: ['ingestion'],
				operation: ['unstructuredText'],
			},
		},
		required: true,
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 5, // Large text box
		},
		default: '',
		description: 'The unstructured text to ingest',
		displayOptions: {
			show: {
				resource: ['ingestion'],
				operation: ['unstructuredText'],
			},
		},
		required: true,
	},
];


// Here we define what to show when the DELETE Operation is selected.
// We do that by adding `operation: ["delete"]` to `displayOptions.show`
const WebsiteOperation: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		description: 'The ID of the workspace that the context vault belongs to',
		displayOptions: {
			show: {
				resource: ['ingestion'],
				operation: ['websiteData'],
			},
		},
		required: true,
	},
	{
		displayName: 'Context Vault ID',
		name: 'knowledgeGraphId',
		type: 'string',
		default: '',
		description: 'The ID of the vault that the data should be ingested into',
		displayOptions: {
			show: {
				resource: ['ingestion'],
				operation: ['websiteData'],
			},
		},
		required: true,
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		description: 'The URL of the website to ingest data from',
		displayOptions: {
			show: {
				resource: ['ingestion'],
				operation: ['websiteData'],
			},
		},
		required: true,
	},
];

export const IngestionFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                ingestion:unstructuredText                                */
	/* -------------------------------------------------------------------------- */
	...TextOperation,

	/* -------------------------------------------------------------------------- */
	/*                              ingestion:websiteData                               */
	/* -------------------------------------------------------------------------- */
	...WebsiteOperation,
];
