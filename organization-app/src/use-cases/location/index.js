import { locationDb } from '../../data-access/'

import makeAddLocation from './add-location'
import makeEditLocation from './edit-location'
import makeListLocation from './list-location'
import makeListLocations from './list-locations'
import makeRemoveLocation from './remove-location'

const addLocation = makeAddLocation({ locationDb })
const editLocation = makeEditLocation({ locationDb })
const listLocation = makeListLocation({ locationDb })
const listLocations = makeListLocations({ locationDb })
const removeLocation = makeRemoveLocation({ locationDb })
const locationService = Object.freeze({
   addLocation,
   editLocation,
   listLocation,
   listLocations,
   removeLocation,
})

export default locationService
export { addLocation, editLocation, listLocation, listLocations, removeLocation }
