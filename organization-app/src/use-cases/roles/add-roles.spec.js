import makeAddRoles from './add-roles'
import makeRolesDb from '../../data-access/roles-db'
import makeFakeRoles from '../../../__test/fakeData/roles'

var expect = require('chai').expect

const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization
const entitlementsMakeDb = require('../../../__test/db/index').entitlements

describe('Add roles usecase', () => {
   let rolesDb
   beforeEach(() => {
      rolesDb = makeRolesDb({
         organizationMakeDb,
         userMakeDb,
         rolesMakeDb,
         entitlementsMakeDb,
      })
   })

   it('It adds new roles', async () => {
      //Fake role creates random values for organization_id
      //Overriding these to match with values present in the database
      const newOrganizationRole = makeFakeRoles({
         organization_id: 1,
         parent_role: null,
         deleted: false,
      })
      const addRoles = makeAddRoles({ rolesDb })
      const inserted = (await addRoles(newOrganizationRole)).dataValues
      newOrganizationRole.id = inserted.id
      newOrganizationRole.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newOrganizationRole)
   })
})
