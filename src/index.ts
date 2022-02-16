import express, { Application, Request, Response } from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
