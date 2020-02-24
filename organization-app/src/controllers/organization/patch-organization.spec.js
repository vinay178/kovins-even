import makePatchOrganization from './patch-organization'
import makeFakeOrganization from '../../../__test/fakeData/organization'
const log = require('../../_helpers/log')

var expect = require('chai').expect

describe('Organization patch controller', () => {
   it('successfully patches organization ', async () => {
      const fakeOrganization = makeFakeOrganization()
      const patchOrganization = makePatchOrganization({ editOrganization: c => c, log })
      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         params: {
            id: fakeOrganization.id,
         },
         body: fakeOrganization,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }

      const actual = await patchOrganization(request)

      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const fakeOrganization = makeFakeOrganization()
      const patchOrganization = makePatchOrganization({
         editOrganization: () => {
            throw new Error('Boo!')
         },
         log,
      })
      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         params: {
            id: fakeOrganization.id,
         },
         body: fakeOrganization,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 400,
         body: { success: false, error: 'Boo!' },
      }

      const actual = await patchOrganization(request)

      expect(actual).to.eql(expected)
   })
})
