import { config } from 'dotenv'
config()

import * as express from 'express'
import * as cors from 'cors'

import DieRouter from './routes/Die.route'
import TraditionRouter from './routes/Tradition.route'
import ClassRouter from './routes/CharacterClass.route'
import CharacterRouter from './routes/Character.route'
import SphereRouter from './routes/Sphere.route'
import ItemRouter from './routes/Item.route'
import { connect } from './util/mongo'

const testMongoConnection = async () => {
  await connect()
}

async function init() {
  await testMongoConnection()

  const port = 3000
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.get('/die', DieRouter)
  app.use('/tradition', TraditionRouter)
  app.use('/class', ClassRouter)
  app.use('/item', ItemRouter)
  app.use('/character', CharacterRouter)
  app.use('/sphere', SphereRouter)

  app.use((req, res, next) => {
    res.status(404).send({ result: null, error: 'resource not found' })
  })

  app.use((err, req, res, next) => {
    console.error(err.message)
    if (!err.status) {
      err.status = 500
    }
    res.status(err.status).json({ result: null, error: err.message })
    next(err)
  })

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
  })
}

init()
