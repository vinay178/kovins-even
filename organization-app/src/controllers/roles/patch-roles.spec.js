import makePatchRole from './patch-roles'
import makeFakeRole from '../../../__test/fakeData/roles'
const log = require('../../_helpers/log')

var expect = require('chai').expect

const headers = {
   'Content-Type': 'application/json',
}

describe('Patch role controller', () => {
   it('Successfully patches the role', async () => {
      const fakeRole = makeFakeRole()
      const patchRole = makePatchRole({ editRoles: c => c, log, headers })
      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         params: {
            id: fakeRole.id,
         },
         body: fakeRole,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }

      const actual = await patchRole(request)

      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const fakeRole = makeFakeRole()
      const patchRole = makePatchRole({
         editRoles: () => {
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
            id: fakeRole.id,
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

      const actual = await patchRole(request)

      expect(actual).to.eql(expected)
   })
})
