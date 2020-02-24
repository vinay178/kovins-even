import { licenseKeysDb } from '../../data-access'
import makeAddLicenseKey from './add-license-key'
import makeEditLicenseKey from './edit-license-key'
import makeListLicenseKeys from './list-license-keys'

////   License Keys Use cases    ////
const addLicenseKey = makeAddLicenseKey({ licenseKeysDb })
const editLicenseKey = makeEditLicenseKey({ licenseKeysDb })
const listLicenseKeys = makeListLicenseKeys({ licenseKeysDb })

const licenseKeysService = Object.freeze({
   addLicenseKey,
   editLicenseKey,
   listLicenseKeys,
})

export { addLicenseKey, editLicenseKey, listLicenseKeys }
export default licenseKeysService
