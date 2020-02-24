import { addLicenseKey, editLicenseKey, listLicenseKeys } from '../../use-cases/license-keys'

import makeGetLicenseKeys from './get-license-keys'
import makePatchLicenseKey from './patch-license-key'
import makePostLicenceKey from './post-license-key'

//Common header
const headers = {
   'Content-Type': 'application/json',
}
// Logger
const log = require('../../_helpers/log')

//Controllers
const getLicenseKeys = makeGetLicenseKeys({ listLicenseKeys, log, headers })
const postLicenseKey = makePostLicenceKey({ addLicenseKey, log, headers })
const patchLicenseKey = makePatchLicenseKey({ editLicenseKey, log, headers })

const licenseKeysController = Object.freeze({
   getLicenseKeys,
   postLicenseKey,
   patchLicenseKey,
})

export { getLicenseKeys, postLicenseKey, patchLicenseKey }
export default licenseKeysController
