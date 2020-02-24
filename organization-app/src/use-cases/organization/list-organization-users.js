export default function makeListOrganizationUsers({ organizationDb }) {
   return async function listOrganizationUsers({ id }) {
      if (!id) throw new Error('Id is required')
      const organizationUsers = await organizationDb.findOrgUsers({ id })
      return organizationUsers
   }
}
