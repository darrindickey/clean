import bcrypt from 'bcrypt-nodejs'

// import { dd } from 'server/resources/logger'
// import db from 'server/resources/db'

import User from './models/user'
// import Login from 'server/models/Login'


const TABLE = 'users';

class UserRepository {

	constructor() {
		this.error = this.error.bind(this)
	}

	login({ email, password }) {
		return User.where({email}).fetch().then((user) => {
			if (! user) {
				return Promise.resolve(null)
			}

			if (bcrypt.compareSync(password, user.get('password'))) {
				return Promise.resolve(user);
			}
			return Promise.resolve(null)
		}, (err) => {
			return Promise.reject(err)
		})
	}

	// login({ email, password }) {
	// 	return User.where({email}).fetch().then((user) => {
	// 		if (! user) {
	// 			return Promise.resolve(null)
	// 		}
	//
	// 		if (bcrypt.compareSync(password, user.get('password'))) {
	// 			return Promise.resolve(user);
	// 		}
	// 		return Promise.resolve(null)
	// 	}, (err) => {
	// 		return Promise.reject(err)
	// 	})
	// }

	facebookLogin({ id, email, first_name, last_name }) {
		return this.getByEmail(email).then((user) => {
			if (user) {
				return user.save({
					first_name,
					last_name,
					facebook_id: id
				}).then((user) => {
					return Promise.resolve(user)
				})
			}
			else {
				return new User({
					email,
					first_name,
					last_name,
					facebook_id: id
				}).save().then((user) => {
					return Promise.resolve(user)
				})
			}
		}, (err) => {
			return Promise.reject(err)
		})
	}

	signup({ email, firstName, lastName, password }) {
		return new User({
			email,
			first_name: firstName,
			last_name: lastName,
			password: bcrypt.hashSync(password)
		}).save()
	}

	forgotPassword({ email }) {
		return Promise.resolve(null)
	}

	resetPassword({ password, token }) {
		return Promise.resolve(null)
	}

	changePassword({ currentPassword, newPassword }) {
		return Promise.resolve(null)
	}

	getById(id) {
		return User.where({id}).fetch()
	}

	getByEmail(email) {
		return User.where({email}).fetch()
	}

	// registerSuccessfulLogin({ user, ip }) {
	// 	new Login({
	// 		user_id: user.get('id'),
	// 		created_at: new Date(),
	// 		ip
	// 	}).save()
	// }

	error(err) {
		dd(err)
		throw new Error('ERROR')
	}
}

export default new UserRepository()
