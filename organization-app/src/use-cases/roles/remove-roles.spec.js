import makeRemoveRoles from './remove-roles'
import makeRolesDb from '../../data-access/roles-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization
const entitlementsMakeDb = require('../../../__test/db/index').entitlements

describe('Remove roles usecase', () => {
   let rolesDb
   beforeEach(() => {
      rolesDb = makeRolesDb({
         organizationMakeDb,
         userMakeDb,
         rolesMakeDb,
         entitlementsMakeDb,
      })
   })

   it('It must include an id', async () => {
      const removeRoles = makeRemoveRoles({
         rolesDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      expect(removeRoles({ id: null })).to.be.rejectedWith('Role id is required')
   })

   it('Must have a valid id', async () => {
      const removeRoles = makeRemoveRoles({
         rolesDb,
      })

      //Id that is not present in the database
      const roleIdToDelete = 111222333
      const expected = {
         deletedCount: 0,
         message: 'Roles not found, nothing to delete.',
      }
      const rolesToBeDeleted = await removeRoles({ id: roleIdToDelete })

      expect(rolesToBeDeleted).to.eql(expected)
   })

   it('Must remove a role', async () => {
      const removeRoles = makeRemoveRoles({ rolesDb })

      // A valid id present in the database
      const roleIdToDelete = 1
      const expected = {
         deletedCount: 1,
         message: 'Role has been deleted',
      }

      const rolesToBeDeleted = await removeRoles({ id: roleIdToDelete })
      expect(rolesToBeDeleted).to.eql(expected)
   })
})
