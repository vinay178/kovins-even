import makeListRoles from './list-roles'
import makeRolesDb from '../../data-access/roles-db'

var chai = require('chai')

var expect = chai.expect

const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization
const entitlementsMakeDb = require('../../../__test/db/index').entitlements

describe('List roles usecase', () => {
   let rolesDb
   beforeEach(() => {
      rolesDb = makeRolesDb({
         organizationMakeDb,
         userMakeDb,
         rolesMakeDb,
         entitlementsMakeDb,
      })
   })

   it('Must list all active roles', async () => {
      const listRoles = makeListRoles({ rolesDb })

      const roles = await listRoles()

      const check = checkRoles(roles)
      expect(check).to.equal(true)
   })
})

function checkRoles(roles) {
   let wrongRoles = []
   //Destructuring to get the state of active
   for (var {
      dataValues: { is_active: activeRole },
   } of roles)
      if (!activeRole) return false
   return true
}
