import makePatchDepartment from './patch-department'
import makeFakeDepartment from '../../../__test/fakeData/department'
const log = require('../../_helpers/log')

var expect = require('chai').expect

const headers = {
   'Content-Type': 'application/json',
}

describe('Patch department controller', () => {
   it('Successfully patches the role', async () => {
      const fakeDepartment = makeFakeDepartment()
      const patchDepartment = makePatchDepartment({
         editDepartment: c => c,
         log,
         headers,
      })
      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         params: {
            id: fakeDepartment.id,
         },
         body: fakeDepartment,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }

      const actual = await patchDepartment(request)

      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const fakeDepartment = makeFakeDepartment()
      const patchDepartment = makePatchDepartment({
         editDepartment: () => {
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
            id: fakeDepartment.id,
         },
         body: fakeDepartment,
      }

      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 400,
         body: { success: false, error: 'Boo!' },
      }

      const actual = await patchDepartment(request)

      expect(actual).to.eql(expected)
   })
})
