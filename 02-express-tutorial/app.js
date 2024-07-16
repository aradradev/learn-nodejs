const express = require('express')
const { products } = require('./data')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1> <a href="/api/products">products</a>')
})
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product
    return { id, name, image }
  })
  res.json(newProducts)
})

app.all('*', (req, res) => {
  res.send('<h3>resource not found</h3>')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000...')
})
