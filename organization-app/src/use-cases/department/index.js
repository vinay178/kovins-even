import { departmentDb } from '../../data-access'

import makeAddDepartment from './add-department'
import makeListDepartment from './list-department'
import makeListDepartments from './list-departments'
import makeEditDepartment from './edit-department'
import makeRemoveDepartment from './remove-department'

const addDepartment = makeAddDepartment({ departmentDb })
const listDepartment = makeListDepartment({ departmentDb })
const listDepartments = makeListDepartments({ departmentDb })
const editDepartment = makeEditDepartment({ departmentDb })
const removeDepartment = makeRemoveDepartment({ departmentDb })

const departmentService = Object.freeze({
   addDepartment,
   listDepartment,
   listDepartments,
   editDepartment,
   removeDepartment,
})
export default departmentService

export { addDepartment, listDepartment, listDepartments, editDepartment, removeDepartment }
