import makeDepartment from '../../entities/departments'
export default function makeEditDepartment({ departmentDb }) {
   return async function editDepartment({ id, ...changes }) {
      if (!id) throw new Error('Department id is required')

      const existing = await departmentDb.findById({ id })

      if (!existing) throw new RangeError('Department not found')
      const department = makeDepartment({ ...existing, ...changes })

      const updated = await departmentDb.update({
         id: id,
         dept_name: department.getDeptName(),
         parent_dept: department.getParentDept(),
         is_active: department.getIsActive(),
         organization_id: department.getOrganizationId(),
         time_stamp: department.getTimeStamp(),
         deleted: department.getDeleted(),
      })

      return { ...existing, ...changes }
   }
}
