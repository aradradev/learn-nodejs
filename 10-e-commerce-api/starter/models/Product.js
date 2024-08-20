const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg',
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['office', 'kitchen', 'bedroom'],
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    enum: {
      values: ['ikea', 'liddy', 'marcos'],
      message: '{VALUE} is not supported',
    },
  },
  colors: {
    type: [String],
    required: true,
  },
  featured: {
    type: Boolean,
  },
  freeShipping: { type: Boolean },
  inventory: { type: Number },
  averageRating: { type: Number },
  user: mongoose.Types.ObjectId('User'),
  timestamps: true,
})

module.exports = mongoose.model('Product', ProductSchema)
