export default function buildMakeDepartment() {
   return function makeDepartment({
      id,
      dept_name,
      parent_dept,
      is_active = true,
      organization_id,
      time_stamp = Date.now(),
      deleted = false,
   } = {}) {
      if (!dept_name) {
         throw new Error('Department must have a name.')
      }
      if (dept_name.length < 3) {
         throw new Error('Department name must be longer than 2 characters.')
      }
      if (!organization_id) {
         throw new Error('Department must have organization id')
      }
      return Object.freeze({
         getId: () => id,
         getDeptName: () => dept_name,
         getParentDept: () => parent_dept,
         getOrganizationId: () => organization_id,
         getTimeStamp: () => time_stamp,
         getDeleted: () => deleted,
         getIsActive: () => is_active,
         activate: () => {
            is_active = true
         },
         deactivate: () => {
            is_active = false
         },
         markDeleted: () => {
            is_active = false
            deleted = true
         },
      })
   }
}
