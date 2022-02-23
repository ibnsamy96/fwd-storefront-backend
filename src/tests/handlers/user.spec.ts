import supertest from 'supertest'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import app from '../../server'
import appConfig from '../../config/app.config'

const request = supertest(app)
let userId: string | number
let token: string = ''

describe('User EndPoints', () => {
  it('should add a new user', async () => {
    const result = await request.post('/users').send({
      firstname: 'firstname',
      lastname: 'lastname',
      password: 'password'
    })
    token = result.body
    const decodedJwt = jwt.verify(token, appConfig.jwtSecret as string) as {
      user: { id: number; firstname: string; lastname: string }
    }
    const { id, ...userInfo } = decodedJwt.user
    userId = id

    expect(userInfo).toEqual({
      firstname: 'firstname',
      lastname: 'lastname'
    })
  })

  it('should show user by id', async () => {
    const result = await request.get(`/users/${userId}`).set('Authorization', `Bearer ${token}`)
    const comparePass = bcrypt.compareSync(`password${appConfig.bcryptPaper}`, result.body.password)
    expect(comparePass).toEqual(true)
    expect(result.body).toEqual({
      id: userId,
      firstname: 'firstname',
      lastname: 'lastname',
      password: result.body.password
    })
  })

  it('show all users without valid token', async () => {
    const result = await request.get(`/users`).set('Authorization', `InValidToken`)
    expect(result.status).toBe(401)
  })

  it("should show user's orders", async () => {
    let product: { id: number }

    await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'new product',
        price: 250,
        category: 'product type'
      })
      .then((response) => {
        product = response.body
      })
      .then(() => {
        request
          .post('/orders')
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'active',
            user_id: userId,
            order_products: [
              {
                product_id: product.id,
                quantity: 1
              }
            ]
          })
      })

    const response = await request
      .get(`/users/${userId}/orders`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toEqual(200)
  })
})
