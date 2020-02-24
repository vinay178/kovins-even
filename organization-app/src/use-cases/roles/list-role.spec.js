import makeListRole from './list-role'
import makeRolesDb from '../../data-access/roles-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization
const entitlementsMakeDb = require('../../../__test/db/index').entitlements

describe('List role usecase', () => {
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
      const listRole = makeListRole({
         rolesDb: {
            findOne: () => {
               //To ensure findOne is never called when id not given
               throw new Error('findOne should not have been called')
            },
         },
      })

      expect(listRole({ id: null })).to.be.rejectedWith('Role id is required')
   })

   it('Must have a valid id', async () => {
      const listRole = makeListRole({
         rolesDb,
      })

      //Id that is not present in the database
      expect(listRole({ id: 111222333 })).to.be.rejectedWith('Role not found')
   })

   it('Must return the specified role with valid organization id', async () => {
      const listRole = makeListRole({ rolesDb })

      const roleId = 1

      const listedRole = (await listRole({ id: roleId })).dataValues

      expect(listedRole.id).to.equal(roleId)
      expect(listedRole.organization_id).to.not.equal(null)
   })
})
