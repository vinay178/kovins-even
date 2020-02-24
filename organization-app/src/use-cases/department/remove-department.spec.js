import makeRemoveDepartment from './remove-department'
import makeDepartmentDb from '../../data-access/department-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const departmentMakeDb = require('../../../__test/db/index').org_department

describe('Remove department usecase', () => {
   let departmentDb
   beforeEach(() => {
      departmentDb = makeDepartmentDb({
         departmentMakeDb,
      })
   })

   it('It must include an id', async () => {
      const removeDepartment = makeRemoveDepartment({
         departmentDb: {
            update: () => {
               //To ensure update is never called when id not given
               throw new Error('update should not have been called')
            },
         },
      })

      expect(removeDepartment({ id: null })).to.be.rejectedWith('Department id is required')
   })

   it('Must have a valid id', async () => {
      const removeDepartment = makeRemoveDepartment({
         departmentDb,
      })
      //Id that is not present in the database
      //Id that is not present in the database
      const departmentIdToDelete = 111222333
      const expected = {
         deletedCount: 0,
         message: 'Department not found, nothing to delete.',
      }
      const departmentToBeDeleted = await removeDepartment({ id: departmentIdToDelete })
      expect(departmentToBeDeleted).to.eql(expected)
   })

   it('Must remove a department', async () => {
      const removeDepartment = makeRemoveDepartment({ departmentDb })

      // A valid id present in the database
      const departmentIdToDelete = 1
      const expected = {
         deletedCount: 1,
         message: 'Department has been deleted',
      }

      const departmentToBeDeleted = await removeDepartment({
         id: departmentIdToDelete,
      })
      expect(departmentToBeDeleted).to.eql(expected)
   })
})
