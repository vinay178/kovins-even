import makeEditOrganization from './edit-organization'
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

describe('Edit organization usecases', () => {
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
      const editOrganization = makeEditOrganization({
         organizationDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })
      const organizationToEdit = makeFakeOrganization({ id: undefined })

      expect(editOrganization(organizationToEdit)).to.be.rejectedWith('Id is required')
   })

   it('Must have a valid id', async () => {
      const editOrganization = makeEditOrganization({
         organizationDb,
      })
      //Id that is not present in the database
      const organizationToEdit = makeFakeOrganization({ id: 123123123 })

      expect(editOrganization(organizationToEdit)).to.be.rejectedWith('Organization not found.')
   })

   it('Modifies an organization', async () => {
      const editOrganization = makeEditOrganization({ organizationDb })

      const organizationToEdit = makeFakeOrganization({ id: 2 })
      const organizationEdited = await editOrganization(organizationToEdit)
      organizationToEdit.time_stamp = organizationEdited.time_stamp
      console.log(organizationEdited.time_stamp)

      expect(organizationEdited).to.eql(organizationToEdit)
   })
})
