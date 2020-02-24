import {
   addLocation,
   editLocation,
   listLocation,
   listLocations,
   removeLocation,
} from '../../use-cases/location'

import makePostLocation from './post-location'
import makePatchLocation from './patch-location'
import makeGetLocations from './get-locations'
import makeGetLocation from './get-location'
import makeDeleteLocation from './delete-location'

//Common header
const headers = {
   'Content-Type': 'application/json',
}
// Logger
const log = require('../../_helpers/log')

//Controllers
const postLocation = makePostLocation({ addLocation, log, headers })
const patchLocation = makePatchLocation({ editLocation, log, headers })
const getLocation = makeGetLocation({ listLocation, log, headers })
const getLocations = makeGetLocations({ listLocations, log, headers })
const deleteLocation = makeDeleteLocation({ removeLocation, log, headers })

const locationController = Object.freeze({
   postLocation,
   patchLocation,
   getLocation,
   getLocations,
   deleteLocation,
})

export default locationController
export { postLocation, patchLocation, getLocation, getLocations, deleteLocation }
