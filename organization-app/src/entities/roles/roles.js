export default function buildMakeRoles() {
   return function makeRoles({
      id,
      role_name,
      is_active = true,
      organization_id,
      parent_role = null,
      time_stamp = Date.now(),
      deleted = false,
   } = {}) {
      if (!role_name) throw new Error('Role must have a name')
      if (role_name.length < 2) throw new Error('Role name must be longer than 2 characters')
      if (!organization_id) throw new Error('Roles must have an organization id')
      if (isNaN(organization_id)) throw new Error('Roles organization id must be number')
      if (isNaN(parent_role)) throw new Error('Roles parent role must be a number')

      return Object.freeze({
         getId: () => id,
         getRoleName: () => role_name,
         getIsActive: () => is_active,
         getOrganizationId: () => organization_id,
         getParentRole: () => parent_role,
         getTimeStamp: () => time_stamp,
         getDeleted: () => deleted,
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
