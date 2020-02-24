import makeListLocation from './list-location'
import makeLocationDb from '../../data-access/location-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)
var expect = chai.expect

const locationMakeDb = require('../../../__test/db/index').location

describe('List location usecase', () => {
   let locationDb
   beforeEach(() => {
      locationDb = makeLocationDb({
         locationMakeDb,
      })
   })

   it('It must include an id', async () => {
      const listLocation = makeListLocation({
         locationDb: {
            findById: () => {
               //To ensure findOne is never called when id not given
               throw new Error('findOne should not have been called')
            },
         },
      })
      expect(listLocation({ id: null })).to.be.rejectedWith('Location id is required')
   })

   it('Must have a valid id', async () => {
      const listLocation = makeListLocation({
         locationDb,
      })

      //Id that is not present in the database
      expect(listLocation({ id: 111222333 })).to.be.rejectedWith('Location not found')
   })

   it('Must return the specified Location with valid organization id', async () => {
      const listLocation = makeListLocation({ locationDb })

      const locationId = 1

      const listedLocation = (await listLocation({ id: locationId })).dataValues

      expect(listedLocation.id).to.equal(locationId)
      expect(listedLocation.organization_id).to.not.equal(null)
   })
})
