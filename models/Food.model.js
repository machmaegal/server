const { Schema, model } = require('mongoose')

const foodSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, maxLength: 500 },
		label: [
			{
				type: String,
				enum: ['vegan', 'vegetarian', 'halal', 'gluten-free', 'other'],
			},
		],
	},
	{
		timestamps: true,
	}
)

module.exports = model('Food', foodSchema)
