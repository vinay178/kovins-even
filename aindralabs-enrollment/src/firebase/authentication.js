import admin from 'firebase-admin'

const checkIfAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const userInfo = await admin.auth().verifyIdToken(authorization)
    if (!userInfo)
      return res.status(401).send({ error: 'You are not authorized to make this request' })
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).send({ error: 'You are not authorized to make this request' })
  }
}

export default checkIfAuthenticated
