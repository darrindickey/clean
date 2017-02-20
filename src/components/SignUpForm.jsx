import React from 'react'
// import { signup } from '../actions/AppActions'

export default class SignupForm extends React.Component {

	constructor() {
		super()
		this.handleSignup = this.handleSignup.bind(this)
	}

	handleSignup(e) {
		e.preventDefault()

		const firstName = this.firstNameInput.value
		const lastName = this.lastNameInput.value
		const email = this.emailInput.value
		const password = this.passwordInput.value

		// if (firstName && lastName && email && password) {
		// 	signup({firstName, lastName, email, password})
		//
		// 	this.passwordInput.value = ''
		// }
	}

	render() {
		return (
			<div class="bb-form-container bb-signup">
				<form onSubmit={this.handleSignup} class="bb-form">
					<input
						class="bb-input bb-input--text"
						placeholder="first name"
						ref={(input) => this.firstNameInput = input} />

					<input
						class="bb-input bb-input--text"
						placeholder="last name"
						ref={(input) => this.lastNameInput = input} />

					<input
						class="bb-input bb-input--text"
						placeholder="email"
						ref={(input) => this.emailInput = input} />

					<input
						class="bb-input bb-input--password"
						type="password"
						placeholder="password"
						ref={(input) => this.passwordInput = input} />

					<button type="submit" class="bb-button bb-button--green bb-button--submit">Create Account</button>
				</form>
			</div>
		)
	}
}
