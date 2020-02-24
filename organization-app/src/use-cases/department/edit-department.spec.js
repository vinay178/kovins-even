import makeEditDepartment from './edit-department'
import makeDepartmentDb from '../../data-access/department-db'
import makeFakeDepartment from '../../../__test/fakeData/department'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const departmentMakeDb = require('../../../__test/db/index').org_department

describe('Edit department usecase', () => {
   let departmentDb
   beforeEach(() => {
      departmentDb = makeDepartmentDb({
         departmentMakeDb,
      })
   })

   it('It must include an id', async () => {
      const editDepartment = makeEditDepartment({
         departmentDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      const departmentToEdit = makeFakeDepartment({ id: null })

      expect(editDepartment(departmentToEdit)).to.be.rejectedWith('Department id is required')
   })

   it('Must have a valid id', async () => {
      const editDepartments = makeEditDepartment({
         departmentDb,
      })
      //Id that is not present in the database
      const departmentToEdit = makeFakeDepartment({ id: 123123123 })

      expect(editDepartments(departmentToEdit)).to.be.rejectedWith('Department not found')
   })

   it('Modifies a department', async () => {
      const newOrganizationDepartment = makeFakeDepartment({ id: 1, organization_id: 1 })
      const editDepartments = makeEditDepartment({ departmentDb })
      const inserted = await editDepartments(newOrganizationDepartment)
      newOrganizationDepartment.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newOrganizationDepartment)
   })
})
