import makeUser from '../../entities/user'

export default function makeRemoveUser({ userDb }) {
   return async function removeUser({ id }) {
      if (!id) throw new Error('User id is required')

      const existing = await userDb.findById({ id })
      if (!existing)
         return {
            deletedCount: 0,
            message: 'User not found, nothing to delete.',
         }
      if (existing.deleted)
         return {
            deletedCount: 0,
            message: 'User already deleted.',
         }
      const toDelete = makeUser({ ...existing })
      toDelete.markDeleted()

      const deleted = userDb.update({
         id: id,
         is_active: toDelete.getIsActive(),
         deleted: toDelete.getDeleted(),
      })

      return {
         deletedCount: 1,
         message: 'User has been deleted',
      }
   }
}
