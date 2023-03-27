import { jsonDocumentCodes } from './enums/dataTypes.js'

export const getTypeNameByCode = (code) => {
	if(!jsonDocumentCodes[code]){
		return "add type code to jsonDocumentCodes"
	}

	return jsonDocumentCodes[code]
}

export const isJson = (str) => {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}

export const changeJsonValuesForTypes = (json) => {
	const transformedJson = {}
	Object.keys(json).forEach(key => {
		if(Array.isArray(json[key])){
			transformedJson[key] = {type: 'array'}
			return
		}
		if(typeof json[key] === "object"){
			transformedJson[key] = {
				type: typeof json[key],
				parameters: changeJsonValuesForTypes(json[key])
			}
			return
		}
		transformedJson[key] = {type: typeof json[key]}
	})

	return transformedJson
}
