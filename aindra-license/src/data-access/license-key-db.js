export default function makeLicenseKeysDb({ licenseKeysMakeDb, licensePlansMakeDb }) {
   const findAll = async () => {
      const getData = new Promise((resolve, reject) => {
         licenseKeysMakeDb
            .findAll({
               where: {
                  is_active: true,
               },
               include: [licensePlansMakeDb],
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

   const findById = async ({ id }) => {
      const getData = new Promise((resolve, reject) => {
         licenseKeysMakeDb
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

   const create = async ({ ...licenseKeysInfo }) => {
      const db = new Promise((resolve, reject) => {
         licenseKeysMakeDb
            .create({
               ...licenseKeysInfo,
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

   const update = async ({ id, ...licenseKeysInfo }) => {
      const db = new Promise((resolve, reject) => {
         licenseKeysMakeDb
            .update(licenseKeysInfo, { where: { id: id } })
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
