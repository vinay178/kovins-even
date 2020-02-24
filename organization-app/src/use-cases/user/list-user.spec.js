import makeListUser from './list-user'
import makeUserDb from '../../data-access/user-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)
var expect = chai.expect

const userMakeDb = require('../../../__test/db/index').org_user

describe('List user usecase', () => {
   let userDb
   beforeEach(() => {
      userDb = makeUserDb({
         userMakeDb,
      })
   })

   it('It must include an id', async () => {
      const listUser = makeListUser({
         userDb: {
            findById: () => {
               //To ensure findById is never called when id not given
               throw new Error('findOne should not have been called')
            },
         },
      })
      expect(listUser({ id: null })).to.be.rejectedWith('User id is required')
   })

   it('Must have a valid id', async () => {
      const listUser = makeListUser({
         userDb,
      })

      //Id that is not present in the database
      expect(listUser({ id: 111222333 })).to.be.rejectedWith('User not found')
   })

   it('Must return the specified User with valid organization id', async () => {
      const listUser = makeListUser({ userDb })

      const userId = 1

      const listedUser = (await listUser({ id: userId })).dataValues

      expect(listedUser.id).to.equal(userId)
      expect(listedUser.organization_id).to.not.equal(null)
   })
})
