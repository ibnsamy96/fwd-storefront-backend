import express, { NextFunction, Request, Response } from 'express'
import { ProductDBModel } from '../models/product'
import verifyAuthToken from '../middleware/auth.guard'

const store = new ProductDBModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    next(err)
  }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const product = await store.show(id)
    res.json(product)
  } catch (err) {
    next(err)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, category } = req.body
    const newProduct = await store.create(name, price, category)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes
