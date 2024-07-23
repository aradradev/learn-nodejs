const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true, company: 'caressa' })
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured } = req.query
  const queryObject = {}
  if (featured) {
    return (queryObject.featured = featured === 'true' ? true : false)
  }
  console.log(queryObject)
  const products = await Product.find(queryObject)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
