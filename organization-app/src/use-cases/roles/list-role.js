export default function makeListRoles({ rolesDb }) {
   return async function listRoles({ id }) {
      if (!id) throw new Error('Role id is required')
      const existing = await rolesDb.findById({ id })
      if (!existing) throw new RangeError('Role not found')
      const role = await rolesDb.findOne({ id })
      return role
   }
}
