import makePostLocation from './post-location'
import makeFakeLocation from '../../../__test/fakeData/location'
const log = require('../../_helpers/log')

var expect = require('chai').expect

const headers = {
   'Content-Type': 'application/json',
}

describe('Post location controller', () => {
   it('Successfully posts an location', async () => {
      const postLocation = makePostLocation({ addLocation: c => c, log, headers })
      const location = makeFakeLocation()

      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         body: location,
      }
      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }
      const actual = await postLocation(request)
      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const postLocation = makePostLocation({
         addLocation: () => {
            throw new Error('Boo!')
         },
         log,
         headers,
      })
      const fakeLocation = makeFakeLocation()
      const request = {
         headers: {
            'Content-Type': 'application/json',
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
      const actual = await postLocation(request)
      expect(actual).to.eql(expected)
   })
})
