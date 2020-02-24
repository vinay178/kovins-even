import makeAddDepartment from './add-department'
import makeDepartmentDb from '../../data-access/department-db'
import makeFakeDepartment from '../../../__test/fakeData/department'

var expect = require('chai').expect

const departmentMakeDb = require('../../../__test/db/index').org_department

describe('Add department usecase', () => {
   let departmentDb
   beforeEach(() => {
      departmentDb = makeDepartmentDb({
         departmentMakeDb,
      })
   })

   it('It adds new departments', async () => {
      //Fake department creates random values for organization_id
      //Overriding these to match with values present in the database
      const newDepartment = makeFakeDepartment({
         organization_id: 1,
         parent_dept: null,
         deleted: false,
      })
      const addDepartment = makeAddDepartment({ departmentDb })
      const inserted = (await addDepartment(newDepartment)).dataValues
      newDepartment.id = inserted.id
      newDepartment.time_stamp = inserted.time_stamp

      expect(inserted).to.eql(newDepartment)
   })
})
