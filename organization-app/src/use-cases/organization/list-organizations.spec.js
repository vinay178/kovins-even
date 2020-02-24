import makeListOrganizations from './list-organizations'
import makeOrganizationDb from '../../data-access/organization-db'
import makeFakeOrganization from '../../../__test/fakeData/organization'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const Op = require('../../../__test/db/index').Op
const countryMakeDb = require('../../../__test/db/index').country
const geoFencingTypeMakeDb = require('../../../__test/db/index').geo_fencing_type
const locationMakeDb = require('../../../__test/db/index').location
const departmentMakeDb = require('../../../__test/db/index').org_department
const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization

describe('List organization usecases', () => {
   let organizationDb
   beforeEach(() => {
      organizationDb = makeOrganizationDb({
         organizationMakeDb,
         countryMakeDb,
         geoFencingTypeMakeDb,
         departmentMakeDb,
         userMakeDb,
         rolesMakeDb,
         locationMakeDb,
         Op,
      })
   })

   it('It must include a role', async () => {
      const listOrganization = makeListOrganizations({
         organizationDb: {
            findAll: () => {
               //To ensure the findAll() is not called when role is not given
               throw new Error('findAll() should not have been called')
            },
         },
      })
      //Role as undefined
      expect(listOrganization({ role: undefined })).to.be.rejectedWith(
         'Must need to specify a role',
      )
   })

   it('It must include an id when role is not admin', async () => {
      const listOrganization = makeListOrganizations({
         organizationDb: {
            findAll: () => {
               //To ensure the findAll() is not called when role is not admin
               throw new Error('findAll() should not have been called')
            },
            findUserOrg: () => {
               //To ensure the findUserOrg() is not called when id is not given
               throw new Error('findUserOrg() should not have been called')
            },
         },
      })
      //Role as undefined
      expect(listOrganization({ role: 'user', id: undefined })).to.be.rejectedWith(
         'User id is required',
      )
   })

   it('Must list all active organizations for admin role', async () => {
      const listOrganization = makeListOrganizations({ organizationDb })

      //Role of an admin always be 1
      const organizations = await listOrganization({ role: 'admin' })

      const check = checkOrganization(organizations)
      expect(check).to.equal(true)
   })
})

//Function check if the organization fetched all have is_active = true
//If any organization has is_active=false the use case fails
function checkOrganization(organizations) {
   let wrongOrganizations = []
   for (var {
      dataValues: { is_active: activeOrganization },
   } of organizations)
      if (!activeOrganization) return false

   return true
}
