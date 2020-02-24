import {
   listOrganizations,
   listOrganizationUsers,
   listOrganizationManagers,
   addOrganization,
   editOrganization,
   removeOrganization,
} from '../../use-cases/organization'
import makeGetOrganization from './get-organization'
import makeGetOrganizationUsers from './get-organization-users'
import makeGetOrganizationManagers from './get-organization-managers'
import makePostOrganization from './post-organization'
import makePatchOrganization from './patch-organization'
import makeDeleteOrganization from './delete-organization'

const log = require('../../_helpers/log')

//Controllers
const getOrganization = makeGetOrganization({ listOrganizations, log })
const getOrganizationUsers = makeGetOrganizationUsers({ listOrganizationUsers, log })
const getOrganizationManagers = makeGetOrganizationManagers({ listOrganizationManagers, log })
const postOrganization = makePostOrganization({ addOrganization, log })
const patchOrganization = makePatchOrganization({ editOrganization, log })
const deleteOrganization = makeDeleteOrganization({ removeOrganization, log })

const organizationController = Object.freeze({
   getOrganization,
   getOrganizationUsers,
   getOrganizationManagers,
   postOrganization,
   patchOrganization,
   deleteOrganization,
})

export default organizationController
export {
   getOrganization,
   getOrganizationUsers,
   getOrganizationManagers,
   postOrganization,
   patchOrganization,
   deleteOrganization,
}
