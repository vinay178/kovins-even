import makePatchLocation from './patch-location'
import makeFakeLocation from '../../../__test/fakeData/location'
const log = require('../../_helpers/log')

var expect = require('chai').expect

const headers = {
   'Content-Type': 'application/json',
}

describe('Patch location controller', () => {
   it('Successfully patches the role', async () => {
      const fakeLocation = makeFakeLocation()
      const patchLocation = makePatchLocation({
         editLocation: c => c,
         log,
         headers,
      })
      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         params: {
            id: fakeLocation.id,
         },
         body: fakeLocation,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }

      const actual = await patchLocation(request)

      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const fakeLocation = makeFakeLocation()
      const patchLocation = makePatchLocation({
         editLocation: () => {
            throw new Error('Boo!')
         },
         log,
         headers,
      })

      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         params: {
            id: fakeLocation.id,
         },
         body: fakeLocation,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 400,
         body: { success: false, error: 'Boo!' },
      }

      const actual = await patchLocation(request)

      expect(actual).to.eql(expected)
   })
})
