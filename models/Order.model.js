const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: 'User' },
        food: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
        drink: [{ type: Schema.Types.ObjectId, ref: 'Drink' }]
    },
    {
        timestamps: true
    }
);

module.exports = model('Order', orderSchema);