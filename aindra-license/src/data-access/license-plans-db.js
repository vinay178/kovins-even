export default function makeLicensePlansDb({ licensePlansMakeDb }) {
   const findAll = async () => {
      const getData = new Promise((resolve, reject) => {
         licensePlansMakeDb
            .findAll()
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
   const findById = async ({ id }) => {
      const getData = new Promise((resolve, reject) => {
         licensePlansMakeDb
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

   const create = async ({ ...licenseInfo }) => {
      const db = new Promise((resolve, reject) => {
         licensePlansMakeDb
            .create({
               ...licenseInfo,
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

   const update = async ({ id, ...licenseInfo }) => {
      const db = new Promise((resolve, reject) => {
         licensePlansMakeDb
            .update(licenseInfo, { where: { id: id } })
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
   return Object.freeze({
      findAll,
      findById,
      create,
      update,
   })
}
