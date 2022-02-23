import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import appConfig from '../config/app.config'
import { UserDBModel, User } from '../models/user'

const { jwtSecret } = appConfig
const UserStore = new UserDBModel()

type UserJWTPayload = {
  user: {
    id: number
    lastname: string
    firstname: string
  }
  iat: number
}

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting token
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1] // [0: 'Bearer', 1:'<token>']

    // Checking valid token
    const isValidJwt = jwt.verify(token, jwtSecret as string)
    if (!isValidJwt) {
      throw new Error()
    }

    // Decoding token
    const payload = jwt.decode(token) as UserJWTPayload

    // Checking user existence
    const user: User = await UserStore.show(payload?.user?.id as number)
    if (!user) throw new Error()

    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token.')
  }
}

export default verifyAuthToken
