'use strict';

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs') // "slow hash", more secure

const UserSchema = new mongoose.Schema({
    username: {
		type: String,
		required: true,
        minlength: 6,
        trim: true,
        unique: true,
    },
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
	}, 
	password: {
		type: String,
		required: true,
		minlength: 6
	}
})

// Hashing, security, exports before saving to database
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// METHODS -----------------------------------------------------------
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this

	// Find the user by email
	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this

	// Find the user by username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

// Exporting for use
const User = mongoose.model('User', UserSchema)
module.exports = { User }