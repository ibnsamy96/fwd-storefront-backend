import bcrypt from 'bcrypt'
import { User, UserDBModel } from '../../models/user'
import appConfig from '../../config/app.config'

const user = new UserDBModel()
let userObj: User

describe('User Model', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(user.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(user.create).toBeDefined()
  })

  it('create method should add a new user', async () => {
    userObj = await user.create('firstName', 'lastName', 'password')
    const comparePass = bcrypt.compareSync(`password${appConfig.bcryptPaper}`, userObj.password)
    expect(comparePass).toEqual(true)
    const { id, ...testUserObj } = userObj
    expect(testUserObj).toEqual({
      firstname: 'firstName',
      lastname: 'lastName',
      password: testUserObj.password
    })
  })

  it('show method should return user by id', async () => {
    const result = await user.show(userObj.id as number)
    expect(result).toEqual(userObj)
  })

  it('index method should return a list of users', async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 4; i++) {
      // eslint-disable-next-line no-await-in-loop
      await user.create('firstName', 'lastName', 'password')
    }
    const result = await user.index()
    // expect(result.length).toEqual(5)

    result.forEach((returnedUser) => {
      const { id, ...userInfo } = returnedUser
      expect(userInfo.firstname).toBeDefined()
      expect(userInfo.lastname).toBeDefined()
      expect(userInfo.password).toBeDefined()
    })
  })
})
