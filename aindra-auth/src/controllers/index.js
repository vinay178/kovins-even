import { userVerification } from '../use-cases/auth'
import firebaseAuthentication from '../_helpers/firebase-authentication'
import makeLogin from './login'
//Common header
const headers = {
        'Content-Type': 'application/json',
    }
    // Logger
const log = require('../_helpers/log')
const login = makeLogin({ userVerification, firebaseAuthentication, log, headers })

const loginController = Object.freeze({
    login
})

export default loginController
export { login }