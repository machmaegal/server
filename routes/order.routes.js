const orderRoute = require('express').Router()
const {
	isAuthenticated,
	isAdminAuthenticated,
} = require('../middleware/jwt.middleware')
const Order = require('../models/order.model')

// ADMIN ROUTES---------------------------
// ADMIN get all orders from all customers

orderRoute.get('/admin/all-orders', isAdminAuthenticated, async (req, res) => {
	try {
		let adminId = req.params.userId
		const customerOrders = await Order.find({})
			.populate('food')
			.populate('drink')
			.populate('customer')

		if (customerOrders.length !== 0) {
			return res.status(200).json({ data: customerOrders })
		} else {
			res.status(404).json({ message: 'No orders yet!' })
		}
	} catch (error) {
		res.status(404).json({ message: 'Order not Found!' })
	}
})
// ADMIN update one order
orderRoute.put(
	'/admin/user-order/:orderId',
	isAdminAuthenticated,
	async (req, res) => {
		try {
			// let userId = req.params.userId
			let orderId = req.params.orderId
			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				req.body,
				{ new: true }
			)

			if (updatedOrder) {
				return res.status(200).json({ data: updatedOrder })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)

// -----------------------------
// ADMIN get one order
orderRoute.get(
	'/admin/user-order/:orderId',
	isAdminAuthenticated,
	async (req, res) => {
		try {
			// let userId = req.params.userId
			let orderId = req.params.orderId
			const customerOrder = await Order.findById(orderId)

			if (customerOrder) {
				return res.status(200).json({ data: customerOrder })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)

// ADMIN delete one order
orderRoute.delete(
	'/admin/user-order/:orderId',
	isAdminAuthenticated,
	async (req, res) => {
		try {
			// let userId = req.params.userId
			let orderId = req.params.orderId
			const customerOrder = await Order.findByIdAndDelete(orderId)

			if (customerOrder) {
				return res.status(200).json({ message: 'Order Deleted!' })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)

// USER ROUTES---------------------------
// user get his orders
orderRoute.get(
	'/user/:userId/user-orders',
	isAuthenticated,
	async (req, res) => {
		try {
			let userId = req.params.userId

			const customerOrders = await Order.find({ customer: userId })
				.populate('food')
				.populate('drink')
				.populate('customer')

			if (customerOrders.length !== 0) {
				return res.status(200).json({ data: customerOrders })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)
// user get one order
orderRoute.get(
	'/user/:userId/user-order/:orderId',
	isAuthenticated,
	async (req, res) => {
		try {
			// let userId = req.params.userId
			let orderId = req.params.orderId
			const customerOrder = await Order.findById(orderId)

			if (customerOrder) {
				return res.status(200).json({ data: customerOrder })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)
// user delete one order
orderRoute.delete(
	'/user/:userId/user-order/:orderId',
	isAuthenticated,
	async (req, res) => {
		try {
			// let userId = req.params.userId
			let orderId = req.params.orderId
			const customerOrder = await Order.findByIdAndDelete(orderId)

			if (customerOrder) {
				return res.status(200).json({ message: 'Order Deleted!' })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)
// user update one order
orderRoute.put(
	'/user/:userId/user-order/:orderId',
	isAuthenticated,
	async (req, res) => {
		try {
			// let userId = req.params.userId
			let orderId = req.params.orderId
			console.log(orderId, '>>>>>>', req.body.data)

			const updatedOrder = await Order.findByIdAndUpdate(
				orderId,
				req.body.data,
				{ new: true }
			)

			if (updatedOrder) {
				return res.status(200).json({ data: updatedOrder })
			} else {
				res.status(404).json({ message: 'No orders yet!' })
			}
		} catch (error) {
			res.status(404).json({ message: 'Order not Found!' })
		}
	}
)

// user make order
orderRoute.post(
	'/user/:userId/make-order',
	isAuthenticated,
	async (req, res) => {
		try {
			let userId = req.params.userId
			console.log('req>>>>>>>>>>>>>>>>>', req.body)

			let orderCreated = await Order.create(req.body)
			res.status(200).json({ data: orderCreated })
		} catch (error) {
			res.status(404).json({ message: 'Impossible to put a order' })
		}
	}
)

module.exports = orderRoute
