import { getTypeNameByCode, isJson, changeJsonValuesForTypes } from '../helpers.js'
import { complexDataTypes, dataTypeCodes, simpleDataTypes } from '../enums/dataTypes.js'

class CassandraSchemaTransformer {
    createJsonDataObject(tableName, columns, rows) {
		const params = this.createParamsObject(columns, rows)

		const dataObject = {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            title: tableName,
            type: "object",
            properties: params
		}

		return dataObject
	}

    createParamsObject(columns, rows={}) {
		const params = columns.reduce((res, item) => {
			const isComplexDataType = Boolean(item.type.info)
			if(isComplexDataType){
				const isCustomType = Boolean(item.type.info.fields)

				if(isCustomType) {
					return this.processCustomTypeFields(res, item, rows[item.name])
				}

				if(dataTypeCodes[item.type.code] == complexDataTypes.SET){
					return this.processSetParams(res, item, rows[item.name])
				}

				if(dataTypeCodes[item.type.code] == complexDataTypes.MAP){
					return this.processMapParams(res, item, rows[item.name])
				}
			}

			if(dataTypeCodes[item.type.code] == simpleDataTypes.TEXT && isJson(rows[item.name])){
				return this.processJsonParams(res, item.name, rows[item.name])
			}

			res[item.name] = { type: getTypeNameByCode(item.type.code) }
			return res
		}, {})

		return params
	}

	processCustomTypeFields(res, item, rows) {
		res[item.name] = {
			type: "object",
			parameters: this.createParamsObject(item.type.info.fields, rows)
		}
		return res
	}

	processSetParams(res, item, rows) {
		const isCustomType = Boolean(item.type.info?.info?.fields)
		const customTypeName = isCustomType ? item.type.info.info.name : ''
		const customTypeFields = isCustomType ? item.type.info.info.fields : []
		res[item.name] = {
			type: "set",
			valueType: isCustomType ?
				{ customType: customTypeName, properties: this.createParamsObject(customTypeFields, rows)} :
				getTypeNameByCode(item.type.info.code)
		}
		return res
	}

	processMapParams(res, item, rows) {
		res[item.name] = {
			type: "map",
			valueTypes: item.type.info.map(item => {
				return item.info?.fields ? { customType: item.info.name, properties: this.createParamsObject(item.info.fields, rows)} : getTypeNameByCode(item.code)
			})
		}
		return res
	}

	processJsonParams(res, itemName, itemValue) {
		const json = JSON.parse(itemValue)
		res[itemName] = {
			type: "object",
			parameters: changeJsonValuesForTypes(json)
		}
		return res
	}
}

export { CassandraSchemaTransformer }
