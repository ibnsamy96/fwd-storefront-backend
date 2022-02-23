import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const message = error.message || 'Somethng went Wrong, Please contact us'
  res.json({ '500': message })
  next()
}

export default errorMiddleware
