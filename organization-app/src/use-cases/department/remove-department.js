import makeDepartment from '../../entities/departments'

export default function makeRemoveDepartment({ departmentDb }) {
   return async function removeDepartment({ id }) {
      if (!id) throw new Error('Department id is required')

      const existing = await departmentDb.findById({ id })
      if (!existing)
         return {
            deletedCount: 0,
            message: 'Department not found, nothing to delete.',
         }
      if (existing.deleted)
         return {
            deletedCount: 0,
            message: 'Department already deleted.',
         }
      const toDelete = makeDepartment({ ...existing })
      toDelete.markDeleted()

      const deleted = departmentDb.update({
         id: id,
         is_active: toDelete.getIsActive(),
         deleted: toDelete.getDeleted(),
      })

      return {
         deletedCount: 1,
         message: 'Department has been deleted',
      }
   }
}
