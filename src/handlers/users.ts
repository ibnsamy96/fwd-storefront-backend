import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { UserDBModel } from '../models/user'
import verifyAuthToken from '../middleware/auth.guard'
import appConfig from '../config/app.config'

const user = new UserDBModel()

const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await user.index()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const userObj = await user.show(id)
    res.json(userObj)
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname: firstName, lastname: lastName, password } = req.body
    const newUser = await user.create(firstName, lastName, password)
    const secret: string = appConfig.jwtSecret ? appConfig.jwtSecret : 'secret'

    const token = jwt.sign(
      {
        user: {
          id: newUser.id,
          firstname: newUser.firstname,
          lastname: newUser.lastname
        }
      },
      secret
    )
    res.json(token)
  } catch (error) {
    next(error)
  }
}

const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.user_id)
    const userOrders = await user.getUserOrders(userId)
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.get('/users/:user_id/orders', verifyAuthToken, getUserOrders)
}

export default userRoutes
