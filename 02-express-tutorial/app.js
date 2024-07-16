const express = require('express')

const app = express()

app.use(express.static('./public'))

// app.get('/', (_req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

app.all('*', (_req, res) => {
  res.status(404).send('<h3>resource not found</h3>')
})

app.listen(5000, () => {
  console.log('Server is running on port 5000...')
})
