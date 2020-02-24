import makeRemoveLocation from './remove-location'
import makeLocationDb from '../../data-access/location-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)
var expect = chai.expect

const locationMakeDb = require('../../../__test/db/index').location

describe('Remove location usecase', () => {
   let locationDb
   beforeEach(() => {
      locationDb = makeLocationDb({
         locationMakeDb,
      })
   })

   it('It must include an id', async () => {
      const removeLocation = makeRemoveLocation({
         locationDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      expect(removeLocation({ id: null })).to.be.rejectedWith('Location id is required')
   })

   it('Must have a valid id', async () => {
      const removeLocation = makeRemoveLocation({
         locationDb,
      })
      //Id that is not present in the database
      //Id that is not present in the database
      const locationIdToDelete = 111222333
      const expected = {
         deletedCount: 0,
         message: 'Location not found, nothing to delete.',
      }
      const locationToBeDeleted = await removeLocation({
         id: locationIdToDelete,
      })
      expect(locationToBeDeleted).to.eql(expected)
   })

   it('Must remove a location', async () => {
      const removeLocation = makeRemoveLocation({ locationDb })

      // A valid id present in the database
      const locationIdToDelete = 1
      const expected = {
         deletedCount: 1,
         message: 'Location has been deleted',
      }

      const locationToBeDeleted = await removeLocation({
         id: locationIdToDelete,
      })
      expect(locationToBeDeleted).to.eql(expected)
   })
})
