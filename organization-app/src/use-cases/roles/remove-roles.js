import makeRoles from '../../entities/roles'

export default function makeRemoveRoles({ rolesDb }) {
   return async function removeRoles({ id }) {
      if (!id) throw new Error('Role id is required')

      const existing = await rolesDb.findById({ id })

      if (!existing)
         return {
            deletedCount: 0,
            message: 'Roles not found, nothing to delete.',
         }
      if (existing.deleted)
         return {
            deletedCount: 0,
            message: 'Role already deleted.',
         }
      const toDelete = makeRoles({ ...existing })
      toDelete.markDeleted()

      const deleted = rolesDb.update({
         id: id,
         is_active: toDelete.getIsActive(),
         deleted: toDelete.getDeleted(),
      })

      return {
         deletedCount: 1,
         message: 'Role has been deleted',
      }
   }
}
