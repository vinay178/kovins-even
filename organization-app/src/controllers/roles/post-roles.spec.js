import makePostRoles from './post-roles'
import makeFakeRole from '../../../__test/fakeData/roles'
const log = require('../../_helpers/log')

var expect = require('chai').expect

const headers = {
   'Content-Type': 'application/json',
}

describe('Post role controller', () => {
   it('Successfully posts an organization', async () => {
      const postRole = makePostRoles({ addRoles: c => c, log, headers })
      const role = makeFakeRole()

      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         body: role,
      }
      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }
      const actual = await postRole(request)
      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const postRole = makePostRoles({
         addRoles: () => {
            throw new Error('Boo!')
         },
         log,
         headers,
      })
      const fakeRole = makeFakeRole()
      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         body: fakeRole,
      }
      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 400,
         body: { success: false, error: 'Boo!' },
      }
      const actual = await postRole(request)
      expect(actual).to.eql(expected)
   })
})
