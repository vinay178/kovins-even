export default function buildMakeUser() {
   return function makeUser({
      id,
      firstname,
      lastname,
      gender,
      emailaddress,
      phone_number,
      roles_id,
      department_id,
      locations_id,
      manager_id,
      is_active = true,
      time_stamp = Date.now(),
      deleted = false,
   } = {}) {
      if (!firstname) throw new Error('User must have a first name.')
      if (firstname.length < 3) throw new Error('User first name must be longer than 2 characters.')
      if (!lastname) throw new Error('User must have a last name.')
      if (lastname.length < 3) throw new Error('User last name must be longer than 2 characters.')
      if (!gender) throw new Error('User must have gender details.')
      if (!['male', 'female', 'others'].includes(gender))
         throw new Error('User gender must be male, female or others.')
      if (!emailaddress) throw new Error('User must have a email.')
      if (!phone_number) throw new Error('User must have a phone number.')
      if (!roles_id) throw new Error('User must have a roles id.')
      if (isNaN(roles_id)) throw new Error('User role id must be a number')
      if (!locations_id) throw new Error('User must have a location id.')
      if (isNaN(locations_id)) throw new Error('User location id must be a number')

      return Object.freeze({
         getId: () => id,
         getFirstName: () => firstname,
         getLastName: () => lastname,
         getGender:()=>gender,
         getEmail: () => emailaddress,
         getPhoneNumber: () => phone_number,
         getRolesId: () => roles_id,
         getDepartmentsId: () => department_id,
         getLocationsId: () => locations_id,
         getManagerId: () => manager_id,
         getIsActive: () => is_active,
         getCountryId: () => country_id,
         getTimeStamp: () => time_stamp,
         getDeleted: () => deleted,

         activate: () => {
            is_active = true
         },
         deactivate: () => {
            is_active = false
         },
         markDeleted: () => {
            is_active = false
            deleted = true
         },
      })
   }
}
