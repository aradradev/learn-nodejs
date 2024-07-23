const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  const products = await Product.find({ featured: true, company: 'caressa' })
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: 'products testing route' })
}

module.exports = { getAllProducts, getAllProductsStatic }
