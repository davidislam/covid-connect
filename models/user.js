'use strict';

const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs') // "slow hash", more secure
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		minlength: 1,
		trim: true,
		unique: true,
		match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
		index: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		minlength: 1,
		lowercase: true,
		trim: true,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Invalid email'
		}
	},
	name: {
		type: String,
		required: true,
		validate: {
			validator: validator.isAlphanumeric,
			message: 'Invalid name'
		}
	},
	gender: {
		type: String,
		required: true,
		enum: ['male', 'female']
	},
	age: {
		type: Number,
		min: 0,
		max: 99,
		default: 0
	},
	healthCardNumber: {
		type: String,
		default: ''
	},
	phoneNumber: {
		type: String,
		required: true
	},
	address: {
		type: String,
		default: ""
	},
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken' });

// Hashing, security, exports before saving to database
UserSchema.pre('save', function (next) {
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
UserSchema.statics.findByUsernamePassword = function (username, password) {
	const User = this

	// Find the user by username
	return User.findOne({ username }).then((user) => {
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
