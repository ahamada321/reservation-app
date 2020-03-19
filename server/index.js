const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const SampleDb = require('./sample-db')

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const path = require('path')

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(
  () => {
    if(process.env.NODE_ENV !== 'production') {
      const sampleDb = new SampleDb()
      // sampleDb.initDb()
    }
  }
)

const app = express()
app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)


if(process.env.NODE_ENV === 'production') {
  const appPath = path.join( __dirname, '..', 'dist', 'reservation-app')
  app.use(express.static(appPath))
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}


const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
  console.log('I am running!')
})
