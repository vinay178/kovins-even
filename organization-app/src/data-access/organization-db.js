export default function makeOrganizationDb({
   organizationMakeDb,
   countryMakeDb,
   geoFencingTypeMakeDb,
   departmentMakeDb,
   userMakeDb,
   rolesMakeDb,
   locationMakeDb,
   Op,
}) {
   return Object.freeze({
      findAll,
      findById,
      findUserOrg,
      findOrgUsers,
      findOrgMangers,
      insert,
      update,
   })

   /**
    * Find all organization
    * @param {Number} deleted
    */
   async function findAll({ deleted = false } = {}) {
      const getData = new Promise((resolve, reject) => {
         organizationMakeDb
            .findAll({
               where: {
                  deleted: deleted,
               },
               include: [
                  countryMakeDb,
                  geoFencingTypeMakeDb,
                  departmentMakeDb,
                  rolesMakeDb,
                  locationMakeDb,
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

   /**
    * Find organization by id
    * @param {Number} id
    */

   async function findById({ id }) {
      const db = new Promise((resolve, reject) => {
         organizationMakeDb
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
      else return null
   }

   /**
    * Find organization from user
    * @param {Number} id
    */
   async function findUserOrg({ id }) {
      // Since org_user tables has no direct foreign key relation with organization table
      // fetch user role and there by organization
      const userDb = new Promise((resolve, reject) => {
         userMakeDb
            .findByPk(id)
            .then(data => {
               resolve(data)
            })
            .catch(error => reject(error))
      })

      const userData = await userDb.then(
         res => {
            return res
         },
         error => {
            return error
         },
      )

      const role_id = userData.roles_id

      const organizationDb = new Promise((resolve, reject) => {
         rolesMakeDb
            .findOne({
               where: { id: role_id },
               attributes: [],
               include: [
                  {
                     model: organizationMakeDb,
                     as: 'organization',
                  },
               ],
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
      })

      const organization = await organizationDb.then(
         res => {
            return res
         },
         error => {
            return error
         },
      )

      if (!userData || !organization) return []
      return { ...userData.dataValues, ...organization.dataValues }
   }

   async function findOrgUsers({ id }) {
      const organizationDb = new Promise((resolve, reject) => {
         organizationMakeDb
            .findOne({
               where: { id: id },
               attributes: [],
               include: [
                  {
                     model: rolesMakeDb,
                     attributes: ['id'],
                     where: { deleted: false },
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

      const organizationRoles = await organizationDb.then(
         res => {
            return res
         },
         error => {
            throw new ReferenceError(error)
         },
      )

      if (!organizationRoles) return []
      //map roles ids from the organization to array of ids
      const roleIds = organizationRoles.org_roles.map(roles => {
         return roles.id
      })

      const userDb = new Promise((resolve, reject) => {
         userMakeDb
            .findAll({
               where: { roles_id: roleIds },
               raw: true,
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
      })

      const userData = await userDb.then(
         res => {
            return res
         },
         error => {
            throw new ReferenceError(error)
         },
      )

      return userData
   }

   async function findOrgMangers({ id }) {
      const organizationDb = new Promise((resolve, reject) => {
         organizationMakeDb
            .findOne({
               where: { id: id },
               attributes: [],
               include: [
                  {
                     model: rolesMakeDb,
                     attributes: ['id'],
                     where: { deleted: false, role_name: { [Op.like]: '%anager%' } },
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

      const organizationRoles = await organizationDb.then(
         res => {
            return res
         },
         error => {
            throw new ReferenceError(error)
         },
      )

      if (!organizationRoles) return []
      //map roles ids from the organization to array of ids
      const roleIds = organizationRoles.org_roles.map(roles => {
         return roles.id
      })

      const userDb = new Promise((resolve, reject) => {
         userMakeDb
            .findAll({
               where: { roles_id: roleIds },
               include: [
                  {
                     model: rolesMakeDb,
                     as: 'role',
                  },
               ],
            })
            .then(data => resolve(data))
            .catch(error => reject(error))
      })

      const userData = await userDb.then(
         res => {
            return res
         },
         error => {
            throw new ReferenceError(error)
         },
      )

      return userData
   }

   async function insert({ ...organizationInfo }) {
      const db = new Promise((resolve, reject) => {
         organizationMakeDb
            .create({
               ...organizationInfo,
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

   async function update({ id, ...organizationInfo }) {
      const db = new Promise((resolve, reject) => {
         organizationMakeDb
            .update(organizationInfo, { where: { id: id } })
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
