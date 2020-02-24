import makeAddLocation from './add-location'
import makeLocationDb from '../../data-access/location-db'
import makeFakeLocation from '../../../__test/fakeData/location'

var expect = require('chai').expect

const locationMakeDb = require('../../../__test/db/index').location

describe('Add location usecase', () => {
   let locationDb
   beforeEach(() => {
      locationDb = makeLocationDb({
         locationMakeDb,
      })
   })

   it('It adds new locations', async () => {
      //Fake location creates random values for organization_id
      //Overriding these to match with values present in the database
      const newLocation = makeFakeLocation({
         organization_id: 1,
         deleted: false,
      })
      const addLocation = makeAddLocation({ locationDb })
      const inserted = (await addLocation(newLocation)).dataValues
      newLocation.id = inserted.id
      newLocation.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newLocation)
   })
})
