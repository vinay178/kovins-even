export default function makeListDepartment({ departmentDb }) {
   return async function listDepartment({ id }) {
      if (!id) throw new Error('Department id is required')

      const department = await departmentDb.findById({ id })

      if (!department) throw new RangeError('Department not found')
      return department
   }
}
