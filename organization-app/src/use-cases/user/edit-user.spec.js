import makeEditUser from './edit-user'
import makeUserDb from '../../data-access/user-db'
import makeFakeUser from '../../../__test/fakeData/user'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)
var expect = chai.expect

const userMakeDb = require('../../../__test/db/index').org_user

describe('Edit user usecase', () => {
   let userDb
   beforeEach(() => {
      userDb = makeUserDb({
         userMakeDb,
      })
   })

   it('It must include an id', async () => {
      const editUser = makeEditUser({
         userDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      const userToEdit = makeFakeUser({ id: null })

      expect(editUser(userToEdit)).to.be.rejectedWith('User id is required')
   })

   it('Must have a valid id', async () => {
      const editUsers = makeEditUser({
         userDb,
      })
      //Id that is not present in the database
      const userToEdit = makeFakeUser({ id: 123123123 })

      expect(editUsers(userToEdit)).to.be.rejectedWith('User not found')
   })

   it('Modifies an organization', async () => {
      const newOrganizationUser = makeFakeUser({
         id: 1,
         organization_id: 1,
      })
      const editUsers = makeEditUser({ userDb })
      const inserted = await editUsers(newOrganizationUser)
      newOrganizationUser.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newOrganizationUser)
   })
})
