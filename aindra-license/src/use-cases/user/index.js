import { userDb } from '../../data-access'

import makeUserVerification from './user-verification'

const userVerification = makeUserVerification({ userDb })

export { userVerification }
