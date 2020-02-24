export default function makeListOrganizationManagers({ organizationDb }) {
   return async function listOrganizationManagers({ id }) {
      if (!id) throw new Error('Id is required')
      const organizationManagers = await organizationDb.findOrgMangers({ id })
      return organizationManagers
   }
}
