const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' })
}
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true, company: 'caressa' })
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
