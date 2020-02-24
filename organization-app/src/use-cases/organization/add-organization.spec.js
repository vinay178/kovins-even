import makeAddOrganization from './add-organization'
import makeOrganizationDb from '../../data-access/organization-db'
import makeFakeOrganization from '../../../__test/fakeData/organization'

var expect = require('chai').expect

const Op = require('../../../__test/db/index').Op
const countryMakeDb = require('../../../__test/db/index').country
const geoFencingTypeMakeDb = require('../../../__test/db/index').geo_fencing_type
const locationMakeDb = require('../../../__test/db/index').location
const departmentMakeDb = require('../../../__test/db/index').org_department
const rolesMakeDb = require('../../../__test/db/index').org_roles
const userMakeDb = require('../../../__test/db/index').org_user
const organizationMakeDb = require('../../../__test/db/index').organization

describe('Add organization use cases', () => {
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

   it('Insert organization into database', async () => {
      //Fake organization creates random values for country_id, geo_fencing_type_id, and delete_id
      //Overriding these to match with values present in the database
      const newOrganization = makeFakeOrganization({
         country_id: 1,
         geo_fencing_type_id: 1,
         delete_id: 0,
      })
      const addOrganization = makeAddOrganization({ organizationDb })
      const inserted = (await addOrganization(newOrganization)).dataValues
      newOrganization.id = inserted.id
      newOrganization.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newOrganization)
   })
})
