const mongoose = require('mongoose')
const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 1,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      required: [true, 'title must be provided'],
      trim: true,
      maxlength: [100, 'title cannot be more than 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'comment must be provided'],
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Review', ReviewSchema)
