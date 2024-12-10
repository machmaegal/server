const foodRoute = require('express').Router()
const {
	isAuthenticated,
	isAdminAuthenticated,
} = require('../middleware/jwt.middleware')
const Food = require('../models/Food.model')

// create a dish route
foodRoute.post('/new-dish', isAdminAuthenticated, async (req, res) => {
	try {
		const newDishHeader = req.body
		const dishNameLower = newDishHeader.name.toLowerCase().trim()
		const isNewDish = await Food.findOne({
			name: dishNameLower,
		})
		if (!isNewDish) {
			const createdDish = await Food.create({
				...newDishHeader,
				name: dishNameLower,
			})
			return res.status(200).json({ data: createdDish })
		} else {
			res.status(409).send('Resource Already exists!')
		}
	} catch (error) {
		res.status(409).send('Resource Already exists!')
	}
})

// delete a dish route
foodRoute.delete('/remove-dish', isAdminAuthenticated, async (req, res) => {
	try {
		const newDishHeader = req.body
		const dishNameLower = newDishHeader.name.toLowerCase()
		const foundDish = await Food.findOne({
			name: dishNameLower,
		})

		if (foundDish) {
			const deletedDish = await Food.findByIdAndDelete(foundDish._id)
			return res.status(200).json({
				message: 'Dish removed',
				'Deleted Dish': deletedDish,
			})
		} else {
			res.status(404).send('Nothing to be deleted')
		}
	} catch (error) {
		res.status(409).send('Resource Already exists!')
	}
})

// update a dish route
foodRoute.put('/edit-dish', isAdminAuthenticated, async (req, res) => {
	try {
		const updatedDishHeader = req.body
		const dishNameLower = updatedDishHeader.name.toLowerCase()
		const foundDish = await Food.findOne({
			name: dishNameLower,
		})
		console.log(foundDish)

		if (foundDish) {
			const updatedDish = await Food.findByIdAndUpdate(
				foundDish._id,
				{ ...updatedDishHeader, name: dishNameLower },
				{ new: true }
			)
			return res.status(200).json({
				data: updatedDish,
			})
		} else {
			res.status(404).send('Nothing to be updated')
		}
	} catch (error) {
		res.status(409).send('Resource Already exists!')
	}
})
// find all dishes
foodRoute.get(
	'/dishes',
	/*isAuthenticated,*/ async (req, res) => {
		try {
			const dishes = await Food.find()

			res.status(200).json({ data: dishes })
		} catch (error) {
			res.status(409).send('Resource Already exists!')
		}
	}
)

module.exports = foodRoute
