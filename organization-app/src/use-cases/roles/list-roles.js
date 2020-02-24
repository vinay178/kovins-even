export default function makeListRoles({ rolesDb }) {
   return async function listRoles() {
      const roles = await rolesDb.findAll()
      return roles
   }
}
