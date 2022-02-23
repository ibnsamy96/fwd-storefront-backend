import dotenv from 'dotenv'

dotenv.config()

const appConfig = {
  name: process.env.APP_NAME,
  environment: process.env.ENV,
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_TOKEN,
  bcryptSalt: Number(process.env.SALT_ROUNDS) || 10,
  bcryptPaper: process.env.BCRYPT_PASSWORD
}

export default appConfig
