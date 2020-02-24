export default function makeListDepartments({ userDb }) {
   return async function listDepartments({ id, role }) {
      let users = []
      if (role == 'admin') users = await userDb.findAll()
      else{
         if (!id) throw new Error('User id is required')
         users =  await userDb.findById({ id })
      }
      return users
   }
}
