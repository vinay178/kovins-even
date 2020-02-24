import { userDb } from '../../data-access'

import makeAddUser from './add-user'
import makeListUser from './list-user'
import makeListUsers from './list-users'
import makeEditUser from './edit-user'
import makeRemoveUser from './remove-user'
import makeUserVerification from './user-verification'

const addUser = makeAddUser({ userDb })
const listUser = makeListUser({ userDb })
const listUsers = makeListUsers({ userDb })
const editUser = makeEditUser({ userDb })
const removeUser = makeRemoveUser({ userDb })
const userVerification = makeUserVerification({userDb})

const userService = Object.freeze({
   addUser,
   listUser,
   listUsers,
   editUser,
   removeUser,
})
export default userService

export { addUser, listUser, listUsers, editUser, removeUser, userVerification }
