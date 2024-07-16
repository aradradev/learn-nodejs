const express = require('express')
const { products } = require('./data')

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1> <a href="/api/v1/products/query">products queries</a>')
})
app.get('/api/v1/products/query', (req, res) => {
  const { search, limit } = req.query
  let sortedProducts = [...products]
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search.toLowerCase())
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1)
    return res.status(200).json([{ status: true, data: [], message: 'This product does not exit' }])

  res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
  res.status(404).json([{ status: 404, message: 'resource not found' }])
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000...')
})
