import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'

import appConfig from './config/app.config'

import orderRoutes from './handlers/orders'
import productRoutes from './handlers/product'
import userRoutes from './handlers/users'

const AppName = appConfig.name || 'App'
const PORT = appConfig.port || 3000

// create an instance server
const app: Application = express()
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  // TODO show the api docs
  res.json({
    message: 'Welcome son!'
  })
})

// TODO routes
productRoutes(app)
userRoutes(app)
orderRoutes(app)

// start express server
app.listen(PORT, () => {
  console.log(`${AppName} server is starting at port:${PORT}`)
})

export default app
