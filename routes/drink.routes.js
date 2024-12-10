const drinkRoute = require('express').Router()
const {
	isAuthenticated,
	isAdminAuthenticated,
} = require('../middleware/jwt.middleware')
const Drink = require('../models/Drink.model')

// create a drink route
drinkRoute.post('/new-drink', isAdminAuthenticated, async (req, res) => {
	try {
		const newDrinkHeader = req.body
		const drinkNameLower = newDrinkHeader.name.toLowerCase().trim()
		const isNewDrink = await Drink.findOne({
			name: drinkNameLower,
		})
		if (!isNewDrink) {
			const createdDrink = await Drink.create({
				...newDrinkHeader,
				name: drinkNameLower,
			})
			return res.status(200).json({ data: createdDrink })
		} else {
			res.status(409).send('Resource Already exists!')
		}
	} catch (error) {
		res.status(409).send('Resource Already exists!')
	}
})

// delete a drink route
drinkRoute.delete('/remove-drink', isAdminAuthenticated, async (req, res) => {
	try {
		const newDrinkHeader = req.body
		const drinkNameLower = newDrinkHeader.name.toLowerCase()
		const foundDrink = await Drink.findOne({
			name: drinkNameLower,
		})

		if (foundDrink) {
			const deletedDrink = await Drink.findByIdAndDelete(foundDrink._id)
			return res.status(200).json({
				message: 'Drink removed',
				'Deleted Drink': deletedDrink,
			})
		} else {
			res.status(404).send('Nothing to be deleted')
		}
	} catch (error) {
		res.status(409).send('Resource Already exists!')
	}
})

// update a drink route
drinkRoute.put('/edit-drink', isAdminAuthenticated, async (req, res) => {
	try {
		const updatedDrinkHeader = req.body
		const drinkNameLower = updatedDrinkHeader.name.toLowerCase()
		const foundDrink = await Drink.findOne({
			name: drinkNameLower,
		})

		if (foundDrink) {
			const updatedDrink = await Drink.findByIdAndUpdate(
				foundDrink._id,
				{ ...updatedDrinkHeader, name: drinkNameLower },
				{ new: true }
			)
			return res.status(200).json({
				data: updatedDrink,
			})
		} else {
			res.status(404).send('Nothing to be updated')
		}
	} catch (error) {
		res.status(409).send('Resource Already exists!')
	}
})
// find all drinks
drinkRoute.get(
	'/drinks',
	/*isAuthenticated,*/ async (req, res) => {
		try {
			const drinks = await Drink.find()

			res.status(200).json({ data: drinks })
		} catch (error) {
			res.status(409).send('Resource Already exists!')
		}
	}
)

module.exports = drinkRoute
