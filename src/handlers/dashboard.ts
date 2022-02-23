import express, { NextFunction, Request, Response } from 'express'
import verifyAuthToken from '../middleware/auth.guard'
import DashboardQueries from '../services/dashboard'

const dashboard = new DashboardQueries()

const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.user_id)
    const userOrders = await dashboard.getUserOrders(userId)
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/users/:user_id/orders', verifyAuthToken, getUserOrders)
}

export default dashboardRoutes
