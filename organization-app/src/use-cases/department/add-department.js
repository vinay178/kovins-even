import makeDepartments from '../../entities/departments'
export default function makeAddDepartment({ departmentDb }) {
   return async function addDepartment(departmentInfo) {
      const department = makeDepartments(departmentInfo)
      return departmentDb.insert({
         dept_name: department.getDeptName(),
         parent_dept: department.getParentDept(),
         is_active: department.getIsActive(),
         organization_id: department.getOrganizationId(),
         time_stamp: department.getTimeStamp(),
      })
   }
}
