import makeAddUser from './add-user'
import makeUserDb from '../../data-access/user-db'
import makeFakeUser from '../../../__test/fakeData/user'

var expect = require('chai').expect

const userMakeDb = require('../../../__test/db/index').org_user

describe('Add user usecase', () => {
   let userDb
   beforeEach(() => {
      userDb = makeUserDb({
         userMakeDb,
      })
   })

   it('It adds new users', async () => {
      /** Fake user creates random values for 
       * roles_id
       * department_id,
       * locations_id,
       * manager_id,
       * Overriding these to match with values present in the database
      */
      const newUser = makeFakeUser({
         roles_id: 1,
         department_id: 1,
         locations_id: 1,
         manager_id: 1,
         deleted: false,
      })
      const addUser = makeAddUser({ userDb })
      const inserted = (await addUser(newUser)).dataValues
      newUser.id = inserted.id
      newUser.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newUser)
   })
})
