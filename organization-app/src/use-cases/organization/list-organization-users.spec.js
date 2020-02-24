import makeListOrganizationUsers from './list-organization-users'
import makeOrganizationDb from '../../data-access/organization-db'

var chai = require('chai')

var expect = chai.expect

const Op = require('../../../__test/db/index').Op
const countryMakeDb = require('../../../__test/db/index').country
const geoFencingTypeMakeDb = require('../../../__test/db/index').geo_fencing_type
const locationMakeDb = require('../../../__test/db/index').location
const departmentMakeDb = require('../../../__test/db/index').org_department
const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization

describe('List organization users usecases', () => {
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

   it('It must include an organization id', async () => {
      const listOrganizationUsers = makeListOrganizationUsers({
         organizationDb: {
            findOrgUsers: () => {
               //To ensure update is never called when id not given
               throw new Error('findOrgUsers should not have been called')
            },
         },
      })

      expect(listOrganizationUsers({ id: undefined })).to.be.rejectedWith('Id is required')
   })

   it('It have users', async () => {
      const listOrganizationUsers = makeListOrganizationUsers({ organizationDb })

      const organizationIdToList = 1
      const organizationUsers = await listOrganizationUsers({ id: organizationIdToList })

      expect({ users: organizationUsers }).to.have.nested.property('users[0].firstname')
   })
})
