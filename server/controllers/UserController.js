import express from 'express'

import User from 'server/models/User'
import { dd } from 'server/resources/logger'

const UserController = express.Router()

.get('/', (req, res, next) => {
	res.send('GET api/users')
})

.get('/:id', (req, res, next) => {
	const {id} = req.params

	User.where({id}).fetch({withRelated: ['todos', 'comments', 'news', 'logins']}).then((user) => {
		res.send(user)
	}, next)
})

.post('/', (req, res, next) => {
	res.send('POST api/users')
})

.put('/:id', (req, res, next) => {
	res.send(`PUT api/users/:id (${req.params.id})`)
})

.delete('/:id', (req, res, next) => {
	res.send(`DELETE api/users/:id (${req.params.id})`)
})

export default UserController
