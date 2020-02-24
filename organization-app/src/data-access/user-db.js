export default function makeUserDb({ userMakeDb, departmentMakeDb, rolesMakeDb, locationMakeDb }) {
   return Object.freeze({
      findAll,
      findUsersByRole,
      findUserByEmail,
      findById,
      insert,
      update,
   })
   async function findAll({ deleted = false } = {}) {
      const getData = new Promise((resolve, reject) => {
         userMakeDb
            .findAll({
               where: {
                  deleted,
               },
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

      const res = await getData.then(
         function(res) {
            return res
         },
         function(error) {
            throw new ReferenceError(error)
         },
      )
      return res
   }

   async function findUsersByRole({ roles_id, deleted = false }) {
      const getData = new Promise((resolve, reject) => {
         userMakeDb
            .findAll({
               where: {
                  roles_id,
                  deleted,
               },
            })
            .then(data => {
               resolve(data)
            })
            .catch(error => {
               reject(error)
            })
      })
      const res = await getData.then(
         function(res) {
            return res
         },
         function(error) {
            throw new ReferenceError(error)
         },
      )
      return res
   }

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

   async function insert({ ...userInfo }) {
      const db = new Promise((resolve, reject) => {
         userMakeDb
            .create({
               ...userInfo,
            })
            .then(data => {
               resolve(data)
            })
            .catch(error => {
               reject(error)
            })
      })

      const res = await db.then(
         function(res) {
            return res
         },
         function(error) {
            throw new ReferenceError(error)
         },
      )
      return res
   }

   async function update({ id, ...userInfo }) {
      const db = new Promise((resolve, reject) => {
         userMakeDb
            .update(userInfo, { where: { id: id } })
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

      return res
   }
}
