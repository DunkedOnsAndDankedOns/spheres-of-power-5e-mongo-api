import { config } from 'dotenv'
config()

import * as express from 'express'
import * as cors from 'cors'

import DieRouter from './routes/Die.route'
import TraditionRouter from './routes/Tradition.route'

async function init() {
  const port = 3000
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.get('/die', DieRouter)
  app.use('/tradition', TraditionRouter)

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
