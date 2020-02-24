import makeLocation from '../../entities/location'
export default function makeAddLocation({ locationDb }) {
   return async function addLocation(locationInfo) {
      const location = makeLocation(locationInfo)
      return locationDb.insert({
         name: location.getName(),
         address: location.getAddress(),
         city: location.getCity(),
         state: location.getState(),
         pincode: location.getPincode(),
         is_active: location.getIsActive(),
         organization_id: location.getOrganizationId(),
         country_id: location.getCountryId(),
         time_stamp: location.getTimeStamp(),
      })
   }
}
