import makeListOrganizationManagers from './list-organization-managers'
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

describe('List organization managers usecases', () => {
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
      const listOrganizationUsers = makeListOrganizationManagers({
         organizationDb: {
            findOrgUsers: () => {
               //To ensure update is never called when id not given
               throw new Error('findOrgUsers should not have been called')
            },
         },
      })

      expect(listOrganizationUsers({ id: undefined })).to.be.rejectedWith('Id is required')
   })

   it('It have managers', async () => {
      const listOrganizationManagers = makeListOrganizationManagers({ organizationDb })

      const organizationIdToList = 2
      const organizationManagers = await listOrganizationManagers({ id: organizationIdToList })

      //Destructuring to get the role details of the returned list
      const {
         dataValues: {
            role: { dataValues: manager },
         },
      } = organizationManagers[0]

      const managerRoleName = manager.role_name.toLowerCase()

      expect(managerRoleName.indexOf('manager')).not.equal(-1)
   })
})
