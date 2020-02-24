import makeOrganizationDb from './organization-db'
import makeRolesDb from './roles-db'
import makeDepartmentDb from './department-db'
import makeLocationDb from './location-db'
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

const organizationDb = makeOrganizationDb({
   organizationMakeDb,
   countryMakeDb,
   geoFencingTypeMakeDb,
   departmentMakeDb,
   userMakeDb,
   rolesMakeDb,
   locationMakeDb,
   Op,
})
const rolesDb = makeRolesDb({
   organizationMakeDb,
   userMakeDb,
   rolesMakeDb,
   entitlementsMakeDb,
})

const userDb = makeUserDb({ userMakeDb, departmentMakeDb, rolesMakeDb, locationMakeDb })
const departmentDb = makeDepartmentDb({ departmentMakeDb })
const locationDb = makeLocationDb({ locationMakeDb })
export { organizationDb, rolesDb, departmentDb, locationDb, userDb }
