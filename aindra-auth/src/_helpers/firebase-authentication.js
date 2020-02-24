import admin from 'firebase-admin'

const checkIfAuthenticated = async(req) => {
    try {
        const { authorization } = req.headers
        if (!authorization)
            return
        const userInfo = await admin.auth().verifyIdToken(authorization)
        const { email } = userInfo
        return email
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export default checkIfAuthenticated