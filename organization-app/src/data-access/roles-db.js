export default function makeRolesDb({
   organizationMakeDb,
   entitlementsMakeDb,
   userMakeDb,
   rolesMakeDb,
}) {
   return Object.freeze({
      findAll,
      findById,
      findOne,
      insert,
      update,
   })

   async function findAll({ is_active = true } = {}) {
      const getData = new Promise((resolve, reject) => {
         rolesMakeDb
            .findAll({
               where: {
                  is_active: is_active,
               },
               include: [
                  {
                     model: rolesMakeDb,
                     as: 'reporting_role',
                  },
                  {
                     model: organizationMakeDb,
                     as: 'organization',
                     where: {
                        is_active: is_active,
                     },
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

   async function findOne({ id }) {
      const getData = new Promise((resolve, reject) => {
         rolesMakeDb
            .findOne({
               where: {
                  id: id,
               },
               include: [
                  {
                     model: organizationMakeDb,
                     as: 'organization',
                  },
                  {
                     model: entitlementsMakeDb,
                     as: 'entitlements',
                  },
                  {
                     model: userMakeDb,
                     as: 'users',
                  },
                  {
                     model: rolesMakeDb,
                     as: 'reporting_role',
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

   async function findById({ id }) {
      const getData = new Promise((resolve, reject) => {
         rolesMakeDb
            .findByPk(id)
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
      if (res) return res.dataValues
      else return null
   }

   async function insert({ ...rolesInfo }) {
      const db = new Promise((resolve, reject) => {
         rolesMakeDb
            .create({
               ...rolesInfo,
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

   async function update({ id, ...rolesInfo }) {
      const db = new Promise((resolve, reject) => {
         rolesMakeDb
            .update(rolesInfo, { where: { id: id } })
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
