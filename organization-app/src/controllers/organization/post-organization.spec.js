import makePostOrganization from './post-organization'
import makeFakeOrganization from '../../../__test/fakeData/organization'
const log = require('../../_helpers/log')

var expect = require('chai').expect

describe('Post Organization controller', () => {
   it('Successfully posted an organization', async () => {
      const postOrganization = makePostOrganization({ addOrganization: c => c, log })
      const organization = makeFakeOrganization()

      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         body: organization,
      }
      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }
      const actual = await postOrganization(request)
      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const postOrganization = makePostOrganization({
         addOrganization: () => {
            throw new Error('Boo!')
         },
         log,
      })
      const fakeOrganization = makeFakeOrganization()
      const request = {
         headers: {
            'Content-Type': 'application/json',
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
      const actual = await postOrganization(request)
      expect(actual).to.eql(expected)
   })
})
