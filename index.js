import { databaseEngine } from './config.js'
import { Client } from './dbClient/Client.js'
import { Writer } from './fileWriter/Writer.js'
import { writingFormats } from './enums/dataTypes.js'

const db = new Client(databaseEngine);
db.client.connect()

const data = await db.client.getData(writingFormats.JSON)

const writer = new Writer(writingFormats.JSON, './result.json')
writer.write(data)
