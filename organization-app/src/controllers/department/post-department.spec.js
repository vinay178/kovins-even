import makePostDepartment from './post-department'
import makeFakeDepartment from '../../../__test/fakeData/department'
const log = require('../../_helpers/log')

var expect = require('chai').expect

const headers = {
   'Content-Type': 'application/json',
}

describe('Post department controller', () => {
   it('Successfully posts an department', async () => {
      const postDepartment = makePostDepartment({ addDepartment: c => c, log, headers })
      const department = makeFakeDepartment()

      const request = {
         headers: {
            'Content-Type': 'application/json',
         },
         body: department,
      }
      const expected = {
         headers: {
            'Content-Type': 'application/json',
         },
         statusCode: 201,
         body: { success: true, data: request.body },
      }
      const actual = await postDepartment(request)
      expect(actual).to.eql(expected)
   })

   it('Report user errors', async () => {
      const postDepartment = makePostDepartment({
         addDepartment: () => {
            throw new Error('Boo!')
         },
         log,
         headers,
      })
      const fakeDepartment = makeFakeDepartment()
      const request = {
         headers: {
            'Content-Type': 'application/json',
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
      const actual = await postDepartment(request)
      expect(actual).to.eql(expected)
   })
})
