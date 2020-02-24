export default function makeListUser({ userDb }) {
   return async function listUser({ id }) {
      if (!id) throw new Error('User id is required')

      const user = await userDb.findById({ id })

      if (!user) throw new RangeError('User not found')
      return user
   }
}
