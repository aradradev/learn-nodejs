const mongoose = require('mongoose')
const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 4.5,
    },
    title: {
      type: String,
      required: [true, 'title must be provided'],
      trim: true,
      maxlength: [100, 'review title cannot be more than 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'comment must be provided'],
      trim: true,
      maxlength: [1000, 'review comment cannot be more than 1000 characters'],
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
