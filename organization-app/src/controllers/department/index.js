import {
   addDepartment,
   editDepartment,
   listDepartment,
   listDepartments,
   removeDepartment,
} from '../../use-cases/department'
import makePostDepartment from './post-department'
import makeGetDepartment from './get-department'
import makeGetDepartments from './get-departments'
import makePatchDepartment from './patch-department'
import makeDeleteDepartment from './delete-department'

//Common header
const headers = {
   'Content-Type': 'application/json',
}
// Logger
const log = require('../../_helpers/log')

//Controllers
const postDepartment = makePostDepartment({ addDepartment, log, headers })
const getDepartment = makeGetDepartment({ listDepartment, log, headers })
const getDepartments = makeGetDepartments({ listDepartments, log, headers })
const patchDepartment = makePatchDepartment({ editDepartment, log, headers })
const deleteDepartment = makeDeleteDepartment({
   removeDepartment,
   log,
   headers,
})

const departmentController = Object.freeze({
   postDepartment,
   getDepartment,
   getDepartments,
   patchDepartment,
   deleteDepartment,
})

export default departmentController
export { postDepartment, getDepartment, getDepartments, patchDepartment, deleteDepartment }
