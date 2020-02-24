import makeLicenseKeysDb from './license-key-db'
import makeLicensePlansDb from './license-plans-db'
import makeUserDb from './user-db'

const licensePlansMakeDb = require('../models/index').license_plans
const licenseKeysMakeDb = require('../models/index').license_keys
const userMakeDb = require('../models/index').org_user

const licensePlansDb = makeLicensePlansDb({ licensePlansMakeDb })
const licenseKeysDb = makeLicenseKeysDb({ licenseKeysMakeDb, licensePlansMakeDb })
const userDb = makeUserDb({ userMakeDb })

export { licensePlansDb, licenseKeysDb, userDb }
