var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , bcrypt = require('bcrypt-nodejs')

// User Schema

var UserSchema = new Schema({
  name: String
, username: { type: String, required: true, index: { unique: true }}
, password: {type: String, required: true, select: false}
})

//Hashing the password before saving it

UserSchema.pre('save', function(next) {
  var user = this

  //Hash only if password is new or has been changed
  if (!user.isModified('password')) return next()

  //Generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err)

  //change password to the hashed version
  user.password = hash
  next()

  })
})

//Method to compare a given password with database hash

UserSchema.methods.comparePassword = function(password) {
  var user = this

  return bcrypt.compareSync(password, user.password)
}

//Return the model

module.exports = mongoose.model('User', UserSchema)