import { userDb } from '../../data-access'

import makeUserVerification from './user-verification'

const userVerification = makeUserVerification({ userDb })

const userService = Object.freeze({
    userVerification
})

export default userService

export { userVerification }