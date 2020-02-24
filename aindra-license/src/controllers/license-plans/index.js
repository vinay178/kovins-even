import { addLicensePlan, editLicensePlan, listLicensePlans } from '../../use-cases/license-plans'

import makePostLicencePlan from './post-license-plan'
import makeGetLicensePlans from './get-license-plans'
import makePatchLicensePlan from './patch-license-plan'

//Common header
const headers = {
   'Content-Type': 'application/json',
}
// Logger
const log = require('../../_helpers/log')

//Controllers
const postLicensePlan = makePostLicencePlan({ addLicensePlan, log, headers })
const getLicensePlans = makeGetLicensePlans({ listLicensePlans, log, headers })
const patchLicensePlan = makePatchLicensePlan({ editLicensePlan, log, headers })

const licenseKeysController = Object.freeze({
   postLicensePlan,
   getLicensePlans,
   patchLicensePlan,
})

export { postLicensePlan, getLicensePlans, patchLicensePlan }
export default licenseKeysController
