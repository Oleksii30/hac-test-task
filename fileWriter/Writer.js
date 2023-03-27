import fs from 'fs'
import { writingFormats } from '../enums/dataTypes.js'

class Writer {
	constructor(format, outputPath){
		this.format = format
		this.outputPath = outputPath
	}

	write(data) {
		switch (this.format) {
		case writingFormats.JSON:
			this.writeToJson(data)
			break;
		default:
			console.log('File format is not supported');
		}
	}

	writeToJson(data) {
		fs.writeFile(this.outputPath, JSON.stringify(data, null, 4), 'utf8', () => {
			console.log("JSON file has been saved.");
		})
	}
}

export { Writer }
