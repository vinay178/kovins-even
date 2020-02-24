import makeOrganization from '../../entities/organization'
export default function makeAddOrganization({ organizationDb }) {
   return async function addOrganization(organizationInfo) {
      const organization = makeOrganization(organizationInfo)
      organization.activate()
      return organizationDb.insert({
         org_name: organization.getOrgName(),
         smart_verification_type: organization.getSmartVerificationType(),
         geofencing_active: organization.getGeoFencingActive(),
         geofencing_radius: organization.getGeoFencingRadius(),
         geo_fencing_type_id: organization.getGeoFencingType(),
         website_access_active: organization.getWebsiteAccessType(),
         license_plan_type: organization.getLicensePlanType(),
         license_key_id: organization.getLicenseKey(),
         is_active: organization.getIsActive(),
         country_id: organization.getCountryId(),
         time_stamp: organization.getTimeStamp(),
      })
   }
}
