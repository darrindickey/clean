import Sequelize from 'sequelize';
import sequelize from '../../config/db-config';

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-z0-9\_\-]+$/i,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

let test = User.findAll();
console.log(test)

module.exports = User;

// // Importing Node packages required for schema
// const MySQL = require('mysql');
// const bcrypt = require('bcrypt-nodejs');
// const ROLE_MEMBER = require('../serverConstants').ROLE_MEMBER;
// const ROLE_CLIENT = require('../serverConstants').ROLE_CLIENT;
// const ROLE_OWNER = require('../serverConstants').ROLE_OWNER;
// const ROLE_ADMIN = require('../serverConstants').ROLE_ADMIN;
//
// const Schema = MySQL.Schema;
//
// //= ===============================
// // User Schema
// //= ===============================
// const UserSchema = new Schema({
//   email: {
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   profile: {
//     firstName: { type: String },
//     lastName: { type: String }
//   },
//   role: {
//     type: String,
//     enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
//     default: ROLE_MEMBER
//   },
//   stripe: {
//     customerId: { type: String },
//     subscriptionId: { type: String },
//     lastFour: { type: String },
//     plan: { type: String },
//     activeUntil: { type: Date }
//   },
//   resetPasswordToken: { type: String },
//   resetPasswordExpires: { type: Date }
// },
//   {
//     timestamps: true
//   });
//
// //= ===============================
// // User ORM Methods
// //= ===============================
//
// // Pre-save of user to database, hash password if password is modified or new
// UserSchema.pre('save', function (next) {
//   const user = this,
//     SALT_FACTOR = 5;
//
//   if (!user.isModified('password')) return next();
//
//   bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, null, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });
//
// // Method to compare password for login
// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) { return cb(err); }
//
//     cb(null, isMatch);
//   });
// };
//
// module.exports = MySQL.model('User', UserSchema);
