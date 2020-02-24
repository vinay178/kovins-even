export default function makeUserDb({ userMakeDb }) {
   return Object.freeze({
      findUserByEmail,
      findById,
   })

   async function findUserByEmail({ email }) {
      const db = new Promise((resolve, reject) => {
         userMakeDb
            .findOne({
               where: { emailaddress: email, is_active: true, deleted: false },
            })
            .then(data => {
               resolve(data)
            })
            .catch(error => {
               reject(error)
            })
      })

      const res = await db.then(
         res => {
            return res
         },
         error => {
            return
         },
      )

      if (res) return res.dataValues
      else return
   }

   async function findById({ id }) {
      const db = new Promise((resolve, reject) => {
         userMakeDb
            .findOne({
               where: { id },
               include: [
                  {
                     model: rolesMakeDb,
                     as: 'role',
                  },
                  {
                     model: departmentMakeDb,
                     as: 'department',
                  },
                  {
                     model: locationMakeDb,
                     as: 'location',
                  },
                  {
                     model: userMakeDb,
                     as: 'manager',
                  },
               ],
            })
            .then(data => {
               resolve(data)
            })
            .catch(error => {
               reject(error)
            })
      })

      const res = await db.then(
         res => {
            return res
         },
         error => {
            throw new ReferenceError(error)
         },
      )

      if (res) return res.dataValues
      else return
   }
}
