export default function makeDepartmentDb({ departmentMakeDb }) {
   return Object.freeze({
      findAll,
      findDepartmentByOrganization,
      findById,
      insert,
      update,
   })
   async function findAll({ deleted = false } = {}) {
      const getData = new Promise((resolve, reject) => {
         departmentMakeDb
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

   async function findDepartmentByOrganization({ organization_id, deleted = false }) {
      const getData = new Promise((resolve, reject) => {
         departmentMakeDb
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
         departmentMakeDb
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

   async function insert({ ...departmentInfo }) {
      const db = new Promise((resolve, reject) => {
         departmentMakeDb
            .create({
               ...departmentInfo,
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

   async function update({ id, ...departmentInfo }) {
      const db = new Promise((resolve, reject) => {
         departmentMakeDb
            .update(departmentInfo, { where: { id: id } })
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
