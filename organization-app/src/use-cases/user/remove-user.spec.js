import makeRemoveUser from './remove-user'
import makeUserDb from '../../data-access/user-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)
var expect = chai.expect

const userMakeDb = require('../../../__test/db/index').org_user

describe('Remove user usecase', () => {
   let userDb
   beforeEach(() => {
      userDb = makeUserDb({
         userMakeDb,
      })
   })

   it('It must include an id', async () => {
      const removeUser = makeRemoveUser({
         userDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      expect(removeUser({ id: null })).to.be.rejectedWith('User id is required')
   })

   it('Must have a valid id', async () => {
      const removeUser = makeRemoveUser({
         userDb,
      })
      //Id that is not present in the database
      const userIdToDelete = 111222333
      const expected = {
         deletedCount: 0,
         message: 'User not found, nothing to delete.',
      }
      const userToBeDeleted = await removeUser({
         id: userIdToDelete,
      })
      expect(userToBeDeleted).to.eql(expected)
   })

   it('Must remove a user', async () => {
      const removeUser = makeRemoveUser({ userDb })

      // A valid id present in the database
      const userIdToDelete = 1
      const expected = {
         deletedCount: 1,
         message: 'User has been deleted',
      }

      const userToBeDeleted = await removeUser({
         id: userIdToDelete,
      }) 
      expect(userToBeDeleted).to.eql(expected)
   })
})
