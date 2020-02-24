export default function buildMakeOrganization() {
   return function makeOrganization({
      id,
      org_name,
      smart_verification_type,
      geofencing_active = false,
      geofencing_radius,
      geo_fencing_type_id,
      website_access_active,
      license_plan_type,
      license_key_id,
      is_active = true,
      country_id,
      time_stamp = Date.now(),
      deleted = false,
   } = {}) {
      if (!org_name) {
         throw new Error('Organization must have a name.')
      }
      if (org_name.length < 2) {
         throw new Error('Organization name must be longer than 2 characters.')
      }
      if (!smart_verification_type) {
         throw new Error('Organization must have a smart verification type')
      }
      if (
         !(smart_verification_type === 'verification' || smart_verification_type === 'recognition')
      ) {
         throw new Error(
            'Organization smart verification type must be verification or recognition.',
         )
      }
      if (!geofencing_active && geofencing_active !== false) {
         throw new Error('Organization must have geo fencing active ')
      }
      if (!(geofencing_active === true || geofencing_active === false)) {
         throw new Error('Organization geo fencing active must be true or false')
      }
      if (!geofencing_radius) {
         throw new Error('Organization must have a geo fencing radius')
      }
      if (isNaN(geofencing_radius)) {
         throw new Error('Organization geo fencing radius is not a number')
      }
      if (!geo_fencing_type_id) {
         throw new Error('Organization must have a geo fencing id')
      }

      if (!website_access_active && website_access_active !== false) {
         throw new Error('Organization must have website_access_active')
      }
      if (!(website_access_active === true || website_access_active === false)) {
         throw new Error('Organization website access active must be false or true')
      }
      if (!license_plan_type) {
         throw new Error('Organization must have license pate type')
      }
      if (!license_key_id) {
         throw new Error('Organization must have license key')
      }
      if (!country_id) {
         throw new Error('Organization must have country id')
      }

      return Object.freeze({
         getOrgName: () => org_name,
         getSmartVerificationType: () => smart_verification_type,
         getGeoFencingActive: () => geofencing_active,
         getGeoFencingRadius: () => geofencing_radius,
         getGeoFencingType: () => geo_fencing_type_id,
         getWebsiteAccessType: () => website_access_active,
         getLicensePlanType: () => license_plan_type,
         getLicenseKey: () => license_key_id,
         getTimeStamp: () => time_stamp,
         getDeleted: () => deleted,
         getIsActive: () => is_active,
         getCountryId: () => country_id,
         activate: () => {
            is_active = true
         },
         deactivate: () => {
            is_active = false
         },
         markDeleted: () => {
            is_active = false
            deleted = true
         },
      })
   }
}
