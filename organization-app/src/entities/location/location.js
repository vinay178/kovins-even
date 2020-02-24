export default function buildMakeLocation() {
   return function makeLocation({
      id,
      name,
      address,
      city,
      state,
      pincode,
      organization_id,
      is_active = true,
      country_id,
      time_stamp = Date.now(),
      deleted = false,
   } = {}) {
      if (!name) throw new Error('Location must have a name.')
      if (name.length < 3) throw new Error('Location name must be longer than 2 characters.')
      if (!address) throw new Error('Location must have a address.')
      if (address.length < 3) throw new Error('Location address must be longer than 2 characters.')
      if (!city) throw new Error('Location must have a city.')
      if (!state) throw new Error('Location must have a state.')
      if (!pincode) throw new Error('Location must have a pincode.')
      if (!organization_id) throw new Error('Location must have a organization id.')
      if (!country_id) throw new Error('Location must have a country id.')

      return Object.freeze({
         getId: () => id,
         getName: () => name,
         getAddress: () => address,
         getCity: () => city,
         getState: () => state,
         getPincode: () => pincode,
         getOrganizationId: () => organization_id,
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
