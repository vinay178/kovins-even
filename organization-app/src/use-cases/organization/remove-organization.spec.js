import makeRemoveOrganization from './remove-organization'
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

describe('Remove organization usecase', () => {
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

   it('It must include an Id', async () => {
      const removeOrganization = makeRemoveOrganization({
         organizationDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('Update should not have been called')
            },
         },
      })
      const organizationToDelete = makeFakeOrganization({ id: undefined })

      expect(removeOrganization(organizationToDelete)).to.be.rejectedWith('Id is required')
   })

   it('Must have a valid id', async () => {
      const removeOrganization = makeRemoveOrganization({
         organizationDb,
      })
      //Id that is not present in the database
      const organizationToDelete = makeFakeOrganization({ id: 123123123 })
      const expected = {
         deletedCount: 0,
         message: 'Organization not found, nothing to delete.',
      }
      const organizationDeleted = await removeOrganization(organizationToDelete)
      expect(organizationDeleted).to.eql(expected)
   })

   it('Must remove an organization', async () => {
      const removeOrganization = makeRemoveOrganization({ organizationDb })

      // A valid id present in the database
      const organizationIdToDelete = 2
      const expected = {
         deletedCount: 1,
         message: 'Organization has been deleted',
      }

      const organizationDeleted = await removeOrganization({ id: organizationIdToDelete })
      expect(organizationDeleted).to.eql(expected)
   })
})
