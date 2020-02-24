import { organizationDb } from '../../data-access'
import makeListOrganizations from './list-organizations'
import makeAddOrganization from './add-organization'
import makeEditOrganization from './edit-organization'
import makeRemoveOrganization from './remove-organization'
import makeListOrganizationUsers from './list-organization-users'
import makeListOrganizationManagers from './list-organization-managers'

/////  Organization Use cases /////
const listOrganizations = makeListOrganizations({ organizationDb })
const listOrganizationUsers = makeListOrganizationUsers({ organizationDb })
const listOrganizationManagers = makeListOrganizationManagers({ organizationDb })
const addOrganization = makeAddOrganization({ organizationDb })
const editOrganization = makeEditOrganization({ organizationDb })
const removeOrganization = makeRemoveOrganization({ organizationDb })

const organizationService = Object.freeze({
   listOrganizations,
   listOrganizationUsers,
   listOrganizationManagers,
   addOrganization,
   editOrganization,
   removeOrganization,
})

export default organizationService
export {
   listOrganizations,
   listOrganizationUsers,
   listOrganizationManagers,
   addOrganization,
   editOrganization,
   removeOrganization,
}
