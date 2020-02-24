import makeRoles from '../../entities/roles'
export default function makeAddRoles({ rolesDb }) {
   return async function addRoles(roleInfo) {
      const role = makeRoles(roleInfo)
      role.activate()

      return rolesDb.insert({
         role_name: role.getRoleName(),
         is_active: role.getIsActive(),
         organization_id: role.getOrganizationId(),
         parent_role: role.getParentRole(),
         time_stamp: role.getTimeStamp(),
      })
   }
}
