const databaseEngine = 'cassandra'


const databaseConnection = {
  	cassandra: {
		host: 'localhost',
		port: 7000,
		user: 'John',
		password: 'querty',
		localDataCenter: 'datacenter1',
		keyspace: 'hacolade'
	}
}

export { databaseEngine, databaseConnection }
