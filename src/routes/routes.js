const express = require('express')
const Model = require('../models/models')
const router = express.Router()

// Post Method
router.post('/post', async (req, res) => {
	const data = new Model({
		name: req.body.name,
		age: req.body.age
	})
	try {
		const dataToSave = await data.save() // Mongoose method
		res.status(201).json(dataToSave)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

// Get all Method
router.get('/getAll', async (req, res) => {
	try {
		const data = await Model.find() // Mongoose method
		res.json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
	try {
		const data = await Model.findById(req.params.id) // Mongoose method
		res.json(data)
	} catch (error) {
		res.status(404).json({ message: error.message, info: `No se encuentra el id ${req.params.id}`, data: null })
	}
})

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
	try {
		const id = req.params.id
		const updatedData = req.body
		const options = { new: true }

		const result = await Model.findByIdAndUpdate( // Mongoose method
			id, updatedData, options
		)
		res.send(result)
	} catch (error) {
		res.status(404).json({ message: error.message, info: `No se encuentra el id ${req.params.id}` })
	}
})

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
	try {
		const id = req.params.id
		const data = await Model.findByIdAndDelete(id) // Mongoose method
		res.send(`Document with name ${data.name} has been deleted...`)
	} catch (error) {
		res.status(404).json({ message: error.message, info: `No se encuentra el id ${req.params.id}` })
	}
})

module.exports = router
