const mongoose = require('mongoose');

// additional schemas produce more MoIDs ^_^, use with care
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

// // set just types
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
//   createdAt: Date,
//   updatedAt: Date,
//   bestfriend: mongoose.SchemaTypes.ObjectId,
//   hobies: [String],
//   // // define nested schemas here OR use external
//   // address: {
//   //   street: String,
//   //   city: String,
//   // }
//   address: addressSchema
// });

// add additional configuration
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 120,
    validate: {
      validator: age => age % 2 === 0,
      message: props => `${props.value} is not an even number`
    }
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    lowercase: true, // or upper case
  },
  createdAt: {
    type: Date,
    immutable: true,
    // default: Date.now() // would be static
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    immutable: true,
    // default: Date.now() // would be static
    default: () => Date.now()
  },
  bestfriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  hobbies: [String],
  address: addressSchema // external schema
});

module.exports = mongoose.model('User', userSchema);