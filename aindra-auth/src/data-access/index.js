import makeUserDb from './user-db'

const Op = require('../models/index').Op
const countryMakeDb = require('../models/index').country
const entitlementsMakeDb = require('../models/index').entitlements
const geoFencingTypeMakeDb = require('../models/index').geo_fencing_type
const locationMakeDb = require('../models/index').location
const departmentMakeDb = require('../models/index').org_department
const rolesMakeDb = require('../models/index').org_roles
const userMakeDb = require('../models/index').org_user
const organizationMakeDb = require('../models/index').organization



const userDb = makeUserDb({ userMakeDb, departmentMakeDb, rolesMakeDb, locationMakeDb })
export { userDb }