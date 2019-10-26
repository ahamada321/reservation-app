const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const SampleDb = require('./sample-db')

const productRoutes = require('./routes/products')


mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => {
    const sampleDb = new SampleDb()
    sampleDb.initDb()
  }
)

const app = express()

app.use('/api/v1/products', productRoutes)


const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
  console.log('I am running!')
})
