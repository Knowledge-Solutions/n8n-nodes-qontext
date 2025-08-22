import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { IngestionFields, IngestionOperations } from './IngestionDescription';
import { RetrievalFields, RetrievalOperations } from './RetrievalDescription';

export class Qontext implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qontext',
		name: 'qontext',
		icon: 'file:favicon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Use the Qontext API',
		defaults: {
			name: 'Qontext',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'qontextApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.staging.qontext.ai/v1',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-API-Key': '={{$credentials?.token}}'
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Ingestion',
						value: 'ingestion',
					},
					{
						name: 'Retrieval',
						value: 'retrieval',
					},
				],
				default: 'ingestion',
			},

			...IngestionOperations,
			...IngestionFields,
			...RetrievalOperations,
			...RetrievalFields
		],
	};
}
