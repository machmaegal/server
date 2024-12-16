const foodRoute = require('express').Router()
const {
	isAuthenticated,
	isAdminAuthenticated,
} = require('../middleware/jwt.middleware')
const Food = require('../models/Food.model')

// create a dish route
foodRoute.post('/new-dish', isAdminAuthenticated, async (req, res) => {
	try {
		const newDishHeader = req.body.data
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
foodRoute.delete(
	'/remove-dish/:foodId',
	isAdminAuthenticated,
	async (req, res) => {
		const foodId = req.params.foodId

		try {
			const deletedDish = await Food.findByIdAndDelete(foodId)
			return res.status(200).json({
				message: 'Dish removed',
				'Deleted Dish': deletedDish,
			})
		} catch (error) {
			res.status(404).send('Nothing to be deleted')
		}
	}
)

// update a dish route
foodRoute.put('/edit-dish/:foodId', isAdminAuthenticated, async (req, res) => {
	try {
		const updatedRequest = req.body.data
		const foodId = req.params.foodId
		const updatedDish = await Food.findByIdAndUpdate(
			foodId,
			updatedRequest,
			{ new: true }
		)
		res.status(200).json({
			data: updatedDish,
		})

		// if (foundDish) {
		// 	const updatedDish = await Food.findByIdAndUpdate(
		// 		foundDish._id,
		// 		{ ...updatedDishHeader, name: dishNameLower },
		// 		{ new: true }
		// 	)
		// 	return res.status(200).json({
		// 		data: updatedDish,
		// 	})
		// } else {
		// 	res.status(404).send('Nothing to be updated')
		// }
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
