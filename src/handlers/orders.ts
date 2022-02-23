import express, { NextFunction, Request, Response } from 'express'

import { OrderDBModel } from '../models/order'
import verifyAuthToken from '../middleware/auth.guard'

const order = new OrderDBModel()

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, user_id: userId, order_products: orderProducts } = req.body
    const insertedOrderProducts = await order.create(status, userId, orderProducts)
    res.json(insertedOrderProducts)
  } catch (err) {
    next(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create)
}

export default orderRoutes
