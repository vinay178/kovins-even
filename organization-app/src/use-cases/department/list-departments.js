export default function makeListDepartments({ departmentDb }) {
   return async function listDepartments({ id }) {
      if (id) {
         const departments = await departmentDb.findDepartmentByOrganization({
            organization_id: id,
         })
         return departments
      }
      const departments = await departmentDb.findAll()
      return departments
   }
}
