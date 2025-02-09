const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
      
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [
        /^[0-9]{11}$/,
        'Please enter a valid 10-digit phone number',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    repeatPassword: {
        type: String,
        required: false, 
        select: false,
        validate: {
          validator: function (value) {
            return value === this.password;
          },
          message: 'Passwords must match',
        },
    }
  });
  

const User = mongoose.model('User', userSchema);


const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);


const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const Contact = mongoose.model('Contact', contactSchema);
  
module.exports = { User, Contact, CartItem }; 