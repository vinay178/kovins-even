export default function makeLocationDb({ locationMakeDb }) {
   return Object.freeze({
      findAll,
      findById,
      findLocationByOrganization,
      insert,
      update,
   })

   async function findAll({ deleted = false } = {}) {
      const getData = new Promise((resolve, reject) => {
         locationMakeDb
            .findAll({
               where: {
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

   async function findLocationByOrganization({ organization_id, deleted = false }) {
      const getData = new Promise((resolve, reject) => {
         locationMakeDb
            .findAll({
               where: {
                  organization_id,
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

   async function findById({ id }) {
      const db = new Promise((resolve, reject) => {
         locationMakeDb
            .findByPk(id)
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

   async function insert({ ...locationInfo }) {
      const db = new Promise((resolve, reject) => {
         locationMakeDb
            .create({
               ...locationInfo,
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

   async function update({ id, ...locationInfo }) {
      const db = new Promise((resolve, reject) => {
         locationMakeDb
            .update(locationInfo, { where: { id: id } })
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
