export default function makeListLocation({ locationDb }) {
   return async function listLocation({ id }) {
      if (!id) throw new Error('Location id is required')

      const location = await locationDb.findById({ id })

      if (!location) throw new RangeError('Location not found')
      return location
   }
}
