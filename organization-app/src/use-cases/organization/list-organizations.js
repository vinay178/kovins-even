export default function makeListOrganizations({ organizationDb }) {
   return async function listOrganizations({ role, id }) {
      if (!role) throw new Error('Must need to specify a role')
      let organizations = []
      // Don't change the equality sign. I know what I am doing
      if (role == 'admin') organizations = await organizationDb.findAll()
      else {
         if (!id) throw new Error('User id is required')
         organizations = await organizationDb.findUserOrg({ id })
      }
      return organizations
   }
}
