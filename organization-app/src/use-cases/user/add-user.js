import makeUser from '../../entities/user'
export default function makeAddUser({ userDb }) {
   return async function addUser(userInfo) {
      const user = makeUser(userInfo)
      return userDb.insert({
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
      })
   }
}
