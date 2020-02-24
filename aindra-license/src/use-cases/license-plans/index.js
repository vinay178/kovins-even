import { licensePlansDb } from '../../data-access'
import makeAddLicensePlan from './add-license-plan'
import makeListLicensePlans from './list-license-plans'
import makeEditLicensePlan from './edit-license-plan'

////   License Plans Use cases    ////
const addLicensePlan = makeAddLicensePlan({ licensePlansDb })
const editLicensePlan = makeEditLicensePlan({ licensePlansDb })
const listLicensePlans = makeListLicensePlans({ licensePlansDb })

const licensePlansService = Object.freeze({
   addLicensePlan,
   editLicensePlan,
   listLicensePlans,
})

export { addLicensePlan, editLicensePlan, listLicensePlans }
export default licensePlansService
