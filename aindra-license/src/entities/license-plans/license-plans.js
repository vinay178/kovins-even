export default function buildMakeLicensePlans() {
   return function makeLicensePlans({
      id,
      license_plan_name,
      license_validity_period_days,
      license_max_user_count,
      license_other_criteria = '',
   } = {}) {
      if (!license_plan_name) throw new Error('License plans must have a name')
      if (license_plan_name.length < 2)
         throw new Error('License plans name must be longer than 2 characters')
      if (!license_validity_period_days)
         throw new Error('License plans must have an license validity period')
      if (isNaN(license_validity_period_days))
         throw new Error('License plans validity period must be number')
      if (!license_max_user_count) throw new Error('License plans must have an maximum user count')
      if (isNaN(license_max_user_count)) throw new Error('License plans user count must be number')

      return Object.freeze({
         getId: () => id,
         getLicensePlanName: () => license_plan_name,
         getLicenseValidityPeriod: () => license_validity_period_days,
         getLicenseMaxUserCount: () => license_max_user_count,
         getLicenseOtherCriteria: () => license_other_criteria,
      })
   }
}
