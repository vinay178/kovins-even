import makeFakeDepartment from '../../../__test/fakeData/department'
import makeDepartment from './'
var expect = require('chai').expect
describe('Department Entity', () => {
   it('must have name', () => {
      const department = makeFakeDepartment({ dept_name: null })
      expect(() => makeDepartment(department)).to.throw('Department must have a name.')
   })
   it('name must be longer enough', () => {
      const department = makeFakeDepartment({ dept_name: 'wo' })
      expect(() => makeDepartment(department)).to.throw(
         'Department name must be longer than 2 characters.',
      )
   })
   it('valid name must not throw error', () => {
      const department = makeFakeDepartment({ dept_name: 'software' })
      expect(() => makeDepartment(department)).not.to.throw()
   })
   it('must have an organization id', () => {
      const department = makeFakeDepartment({ organization_id: null })
      expect(() => makeDepartment(department)).to.throw('Department must have organization id')
   })
   it('All valid fields must not throw error', () => {
      const department = makeFakeDepartment({ dept_name: 'software' })
      expect(() => makeDepartment(department)).not.to.throw()
   })
})
