export default function makeListLocations({ locationDb }) {
   return async function listLocation({ id }) {
      if (id) {
         const locations = await locationDb.findLocationByOrganization({
            organization_id: id,
         })
         return locations
      }
      const locations = await locationDb.findAll()
      return locations
   }
}
