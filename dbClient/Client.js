import { dbEngines } from '../enums/dbEngines.js'
import { CassandraClient } from './CassandraClient.js'
import { databaseConnection } from '../config.js'

class Client {
    constructor(dbEngine){
        switch (dbEngine) {
            case dbEngines.CASSANDRA:
              this.client = new CassandraClient(databaseConnection[dbEngine])
              break;
            default:
              console.log('Engine is not supported yet');
          }
    }
}

export { Client }
