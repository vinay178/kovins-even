import makeListDepartment from './list-department'
import makeDepartmentDb from '../../data-access/department-db'

import chaiAsPromised from 'chai-as-promised'
var chai = require('chai')
chai.use(chaiAsPromised)

var expect = chai.expect

const departmentMakeDb = require('../../../__test/db/index').org_department

describe('List department usecase', () => {
   let departmentDb
   beforeEach(() => {
      departmentDb = makeDepartmentDb({
         departmentMakeDb,
      })
   })

   it('It must include an id', async () => {
      const listDepartment = makeListDepartment({
         departmentDb: {
            findById: () => {
               //To ensure findOne is never called when id not given
               throw new Error('findOne should not have been called')
            },
         },
      })

      expect(listDepartment({ id: null })).to.be.rejectedWith('Department id is required')
   })

   it('Must have a valid id', async () => {
      const listDepartment = makeListDepartment({
         departmentDb,
      })

      //Id that is not present in the database
      expect(listDepartment({ id: 111222333 })).to.be.rejectedWith('Department not found')
   })

   it('Must return the specified Department with valid organization id', async () => {
      const listDepartment = makeListDepartment({ departmentDb })

      const departmentId = 1

      const listedDepartment = (await listDepartment({ id: departmentId })).dataValues

      expect(listedDepartment.id).to.equal(departmentId)
      expect(listedDepartment.organization_id).to.not.equal(null)
   })
})
