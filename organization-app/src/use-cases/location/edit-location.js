import makeLocation from '../../entities/location'
export default function makeEditLocation({ locationDb }) {
   return async function makeEditLocation({ id, ...changes }) {
      if (!id) throw new Error('Location id is required')

      const existing = await locationDb.findById({ id })

      if (!existing) throw new RangeError('Location not found')
      const location = makeLocation({ ...existing, ...changes })

      const updated = await locationDb.update({
         id: id,
         name: location.getName(),
         address: location.getAddress(),
         city: location.getCity(),
         state: location.getState(),
         pincode: location.getPincode(),
         is_active: location.getIsActive(),
         organization_id: location.getOrganizationId(),
         country_id: location.getCountryId(),
         time_stamp: location.getTimeStamp(),
         deleted: location.getDeleted(),
      })

      return { ...existing, ...changes }
   }
}
