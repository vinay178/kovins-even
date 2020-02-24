import makeEditRoles from './edit-roles'
import makeRolesDb from '../../data-access/roles-db'
import makeFakeRoles from '../../../__test/fakeData/roles'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization
const entitlementsMakeDb = require('../../../__test/db/index').entitlements

describe('Edit roles usecase', () => {
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
      const editRoles = makeEditRoles({
         rolesDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      const roleToEdit = makeFakeRoles({ id: null })

      expect(editRoles(roleToEdit)).to.be.rejectedWith('Role id is required')
   })

   it('Must have a valid id', async () => {
      const editRoles = makeEditRoles({
         rolesDb,
      })
      //Id that is not present in the database
      const roleToEdit = makeFakeRoles({ id: 123123123 })

      expect(editRoles(roleToEdit)).to.be.rejectedWith('Role not found')
   })

   it('Modifies a role', async () => {
      const newOrganizationRole = makeFakeRoles({ id: 1, organization_id: 1 })
      const editRoles = makeEditRoles({ rolesDb })
      const inserted = await editRoles(newOrganizationRole)
      newOrganizationRole.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newOrganizationRole)
   })
})
