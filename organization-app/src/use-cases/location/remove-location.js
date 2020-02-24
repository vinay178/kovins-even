import makeLocation from '../../entities/location'

export default function makeRemoveLocation({ locationDb }) {
   return async function removeLocation({ id }) {
      if (!id) throw new Error('Location id is required')

      const existing = await locationDb.findById({ id })
      if (!existing)
         return {
            deletedCount: 0,
            message: 'Location not found, nothing to delete.',
         }
      if (existing.deleted)
         return {
            deletedCount: 0,
            message: 'Location already deleted.',
         }
      const toDelete = makeLocation({ ...existing })
      toDelete.markDeleted()

      const deleted = locationDb.update({
         id: id,
         is_active: toDelete.getIsActive(),
         deleted: toDelete.getDeleted(),
      })

      return {
         deletedCount: 1,
         message: 'Location has been deleted',
      }
   }
}
