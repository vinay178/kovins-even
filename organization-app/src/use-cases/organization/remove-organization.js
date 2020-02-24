import makeOrganization from '../../entities/organization'
export default function makeRemoveOrganization({ organizationDb }) {
   return async function removeOrganization({ id }) {
      if (!id) throw new Error('Id is required')

      const existing = await organizationDb.findById({ id })
      if (!existing)
         return {
            deletedCount: 0,
            message: 'Organization not found, nothing to delete.',
         }
      if (existing.deleted)
         return {
            deletedCount: 0,
            message: 'Organization already deleted.',
         }
      const toDelete = makeOrganization({ ...existing })
      toDelete.markDeleted()

      const deleted = organizationDb.update({
         id: id,
         is_active: toDelete.getIsActive(),
         deleted: toDelete.getDeleted(),
      })

      return {
         deletedCount: 1,
         message: 'Organization has been deleted',
      }
   }
}
