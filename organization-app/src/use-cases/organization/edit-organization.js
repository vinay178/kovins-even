import makeOrganization from '../../entities/organization'
export default function makeEditOrganization({ organizationDb }) {
   return async function editOrganization({ id, ...changes } = {}) {
      if (!id) throw new Error('Id is required')

      const existing = await organizationDb.findById({ id })

      if (!existing) throw new RangeError('Organization not found.')

      const organization = makeOrganization({ ...existing, ...changes })

      const updated = await organizationDb.update({
         id: id,
         org_name: organization.getOrgName(),
         smart_verification_type: organization.getSmartVerificationType(),
         geofencing_active: organization.getGeoFencingActive(),
         geofencing_radius: organization.getGeoFencingRadius(),
         geo_fencing_type_id: organization.getGeoFencingType(),
         website_access_active: organization.getWebsiteAccessType(),
         license_plan_type: organization.getLicensePlanType(),
         license_key: organization.getLicenseKey(),
         is_active: organization.getIsActive(),
         time_stamp: organization.getTimeStamp(),
         deleted: organization.getDeleted(),
      })

      return { ...existing, ...changes }
   }
}
