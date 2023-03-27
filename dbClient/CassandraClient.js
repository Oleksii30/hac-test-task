import cassandra from 'cassandra-driver'
import { CassandraSchemaTransformer } from '../dbSchemaTransformers/Cassandra.js'
import { writingFormats } from '../enums/dataTypes.js'
import { tables } from '../mockData.js'

class CassandraClient {
	data = [];

	constructor(config){
		this.client = new cassandra.Client({
			contactPoints: [config.host],
			localDataCenter: config.localDataCenter,
		});

		this.keyspace = config.keyspace
		this.dataTransformer = new CassandraSchemaTransformer()
	}

	connect() {
		this.client.connect((err) => {
			if(err) {
					console.log('connection failed')
			}

			console.log('connected to cassandra')
		})
	}

	async getData(format) {
		switch (format) {
			case writingFormats.JSON:
				await this.prepareDataForWritingToJson()
				break;
			default:
				console.log('File format is not supported');
		}

		return this.data
	}

	async getMockData(format) {
		switch (format) {
			case writingFormats.JSON:
				this.prepareMockDataForWritingToJson()
				break;
			default:
				console.log('File format is not supported');
		}

		return this.data
	}

	async geDatabaseTables( dbName ) {
		const query = "SELECT * FROM system_schema.tables WHERE keyspace_name = ?"
		const result = await this.client.execute(query, [ dbName ], { prepare: true })
		return result.rows.map(row => row.table_name)
	}

	async getTableParameters( tableName ) {
		const table = this.keyspace + '.' + tableName
		const query = `SELECT * FROM ${table} LIMIT 1`
		const result = await this.client.execute(query)

		return [result.columns, result.rows[0]]
	}

	async prepareDataForWritingToJson() {
		const tableNames = await this.geDatabaseTables(this.keyspace)

		for (const tableName of tableNames) {
			const [columns, rows] = await this.getTableParameters(tableName)
			const dataObject = this.dataTransformer.createJsonDataObject(tableName, columns, rows)

			this.data.push(dataObject)
		}
	}

	prepareMockDataForWritingToJson() {
		for (const table of tables) {
			const dataObject = this.dataTransformer.createJsonDataObject(table.name, table.columns, table.rows[0])

			this.data.push(dataObject)
		}
	}

}

export { CassandraClient }
