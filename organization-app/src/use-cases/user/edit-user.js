import makeUser from '../../entities/user'
export default function makeEditUser({ userDb }) {
   return async function editUser({ id, ...changes }) {
      if (!id) throw new Error('User id is required')

      const existing = await userDb.findById({ id })

      if (!existing) throw new RangeError('User not found')
      const user = makeUser({ ...existing, ...changes })

      const updated = await userDb.update({
         id: id,
         firstname: user.getFirstName(),
         lastname: user.getLastName(),
         gender: user.getGender(),
         emailaddress: user.getEmail(),
         phone_number: user.getPhoneNumber(),
         roles_id: user.getRolesId(),
         department_id: user.getDepartmentsId(),
         locations_id: user.getLocationsId(),
         manager_id: user.getManagerId(),
         is_active: user.getIsActive(),
         time_stamp: user.getTimeStamp(),
         deleted: user.getDeleted(),
      })

      return { ...existing, ...changes }
   }
}
