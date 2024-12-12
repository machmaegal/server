const { Schema, model } = require('mongoose');

const drinkSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, maxLength: 500 },
		label: [
			{
				type: String,
				enum: [
					'soft drink',
					'alcohol',
					'halal',
					'vegan',
					'zero sugar',
					'caffeine',
				],
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = model('Drink', drinkSchema);
