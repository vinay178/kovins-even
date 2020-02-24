import { addRoles, editRoles, removeRoles, listRoles, listRole } from '../../use-cases/roles'

import makeGetRoles from './get-roles'
import makeGetRole from './get-role'
import makePostRoles from './post-roles'
import makePatchRoles from './patch-roles'
import makeDeleteRoles from './delete-roles'

//Common header
const headers = {
   'Content-Type': 'application/json',
}
// Logger
const log = require('../../_helpers/log')

//Controllers
const getRoles = makeGetRoles({ listRoles, log, headers })
const getRole = makeGetRole({ listRole, log, headers })
const postRoles = makePostRoles({ addRoles, log, headers })
const patchRoles = makePatchRoles({ editRoles, log, headers })
const deleteRoles = makeDeleteRoles({ removeRoles, log, headers })

const rolesController = Object.freeze({
   getRoles,
   getRole,
   postRoles,
   patchRoles,
   deleteRoles,
})

export default rolesController

export { getRoles, getRole, postRoles, patchRoles, deleteRoles }
