import { addUser, editUser, listUser, listUsers, removeUser } from '../../use-cases/user'

import makeGetUser from './get-user'
import makeGetUsers from './get-users'
import makePostUser from './post-user'
import makePatchUser from './patch-user'
import makeDeleteUser from './delete-user'

//Common header
const headers = {
   'Content-Type': 'application/json',
}
// Logger
const log = require('../../_helpers/log')

// Controllers
const getUser = makeGetUser({ listUser, log, headers })
const getUsers = makeGetUsers({ listUsers, log, headers })
const postUser = makePostUser({ addUser, log, headers })
const patchUser = makePatchUser({ editUser, log, headers })
const deleteUser = makeDeleteUser({ removeUser, log, headers })

const userController = Object.freeze({
   getUser,
   getUsers,
   postUser,
   patchUser,
   deleteUser,
})

export default userController
export { getUser, getUsers, postUser, patchUser, deleteUser }
