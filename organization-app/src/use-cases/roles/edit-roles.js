import makeRoles from '../../entities/roles'
export default function makeEditRoles({ rolesDb }) {
   return async function ediRoles({ id, ...changes } = {}) {
      if (!id) throw new Error('Role id is required')

      const existing = await rolesDb.findById({ id })

      if (!existing) throw new RangeError('Role not found')

      const role = makeRoles({ ...existing, ...changes })

      const updated = await rolesDb.update({
         id: id,
         role_name: role.getRoleName(),
         is_active: role.getIsActive(),
         organization_id: role.getOrganizationId(),
         parent_role: role.getParentRole(),
         time_stamp: role.getTimeStamp(),
         deleted: role.getDeleted(),
      })

      return { ...existing, ...changes }
   }
}
