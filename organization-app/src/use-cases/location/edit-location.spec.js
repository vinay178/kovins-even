import makeEditLocation from './edit-location'
import makeLocationDb from '../../data-access/location-db'
import makeFakeLocation from '../../../__test/fakeData/location'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)
var expect = chai.expect

const locationMakeDb = require('../../../__test/db/index').location

describe('Edit location usecase', () => {
   let locationDb
   beforeEach(() => {
      locationDb = makeLocationDb({
         locationMakeDb,
      })
   })

   it('It must include an id', async () => {
      const editLocation = makeEditLocation({
         locationDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      const locationToEdit = makeFakeLocation({ id: null })

      expect(editLocation(locationToEdit)).to.be.rejectedWith('Location id is required')
   })

   it('Must have a valid id', async () => {
      const editLocations = makeEditLocation({
         locationDb,
      })
      //Id that is not present in the database
      const locationToEdit = makeFakeLocation({ id: 123123123 })

      expect(editLocations(locationToEdit)).to.be.rejectedWith('Location not found')
   })

   it('Modifies an organization', async () => {
      const newOrganizationLocation = makeFakeLocation({
         id: 1,
         organization_id: 1,
      })
      const editLocations = makeEditLocation({ locationDb })
      const inserted = await editLocations(newOrganizationLocation)
      newOrganizationLocation.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newOrganizationLocation)
   })
})
