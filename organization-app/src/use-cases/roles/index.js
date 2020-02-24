import { rolesDb } from '../../data-access'

import makeListRoles from './list-roles'
import makeListRole from './list-role'
import makeAddRoles from './add-roles'
import makeEditRoles from './edit-roles'
import makeRemoveRoles from './remove-roles'

const listRoles = makeListRoles({ rolesDb })
const listRole = makeListRole({ rolesDb })
const addRoles = makeAddRoles({ rolesDb })
const editRoles = makeEditRoles({ rolesDb })
const removeRoles = makeRemoveRoles({ rolesDb })

const rolesService = Object.freeze({
   listRoles,
   listRole,
   addRoles,
   editRoles,
   removeRoles,
})

export default rolesService

export { listRoles, listRole, addRoles, editRoles, removeRoles }
