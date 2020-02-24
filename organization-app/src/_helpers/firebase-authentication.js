import admin from 'firebase-admin'
import { userVerification } from '../use-cases/user/'

const checkIfAuthenticated = async (req, res, next) => {
   try {
      const { authorization } = req.headers
      if (!authorization)
         return res.status(401).send({ error: 'You are not authorized to make this request' })
      const userInfo = await admin.auth().verifyIdToken(authorization)
      const { email } = userInfo
      const userDetails = await userVerification({ email })
      if (!userDetails)
         return res.status(401).send({ error: 'You are not authorized to make this request' })
      const { id, roles_id, department_id } = userDetails
      ;(req.uid = id), (req.rid = roles_id)
      req.did = department_id
      next()
   } catch (e) {
      console.log(e)
      return res.status(401).send({ error: 'You are not authorized to make this request' })
   }
}

export default checkIfAuthenticated
