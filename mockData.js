export const tables = [
	{
		name: 'users',
		rows: [
			{
				id: '1qpo87',
				email: 'mail@gmail.com',
				data: '{"firstName":"John","LastName":"Doe","age":{"days":23,"years":34},"hobbies":["guitar","football"]}'
			}
		],
		columns:[
			{ name: 'id', type: { code: 13, type: null } },
			{ name: 'email', type: { code: 13, type: null } },
			{ name: 'data', type: { code: 13, type: null } }
		]
	},
	{
		name: 'promoters',
		rows: [],
		columns: [
			{ name: 'id', type: { code: 13, type: null } },
			{ name: 'email', type: { code: 13, type: null } },
			{ name: 'is_admin', type: { code: 4, type: null } },
			{ name: 'name', type: { code: 13, type: null } },
			{ name: 'phone', type: { code: 9, type: null } }
		]
	},
	{
		name: 'customers',
		rows: [
			{
				name: 'John',
				address: {
					street: '{"first":"Pavla","second":"Korneliyka"}',
					city: 'Vinnytsia',
					state: 'Ukraine',
					zip: '345678',
					postcodes: ['21022', '21050'],
					phones: {
						home: '111-333-555',
						mobile: '444-666-999'
					}
				},
				email: 'mail@mail.com'
			}
		],
		columns: [
			{ name: 'name', type: { code: 13, type: null } },
			{
				name: 'address',
				type: {
					code: 48,
					type: null,
					info: {
    				name: 'address',
    				fields: [
							{ name: 'street', type: { code: 13, type: null } },
							{ name: 'city', type: { code: 13, type: null } },
							{ name: 'state', type: { code: 13, type: null } },
							{ name: 'zip', type: { code: 9, type: null } },
							{ name: 'postcodes', type: { code: 34, type: null, info: { code: 13, type: null }}},
							{ name: 'phones', type: { code: 48, type: null, info: {
									name: 'phones',
									fields: [
										{ name: 'home', type: { code: 13, type: null } },
										{ name: 'mobile', type: { code: 13, type: null } }
									]
								}}
							}
						]
					}
				}
			},
			{ name: 'email', type: { code: 13, type: null } }
		]
	},
	{
		name: 'mushrooms',
		rows: [],
		columns: [
			{ name: 'name', type: { code: 13, type: null } },
			{
				name: 'family',
				type: {
					code: 34,
					type: null,
					info: {
						code: 48,
						type: null,
						info: {
							name: 'mushroom',
							fields: [
								{ name: 'name', type: { code: 13, type: null } },
								{ name: 'is_good', type: { code: 4, type: null } },
								{
									name: 'key_features',
									type: { code: 34, type: null, info: { code: 13, type: null }}
								}
							]
						}
					}
				}
			},
			{ name: 'key_words', type: { code: 34, type: null, info: { code: 13, type: null }}},
			{ name: 'story', type: { code: 33, type: null, info: [ { code: 9, type: null }, { code: 13, type: null } ] }}
		]
	},
]

