export default function buildMakeLicenseKey({ crc32 }) {
   const verifyTimezone = timeZone => {
      try {
         const current_date = new Date()
         const convert_to_local = current_date.toLocaleString('en-Us', { timeZone })
         return true
      } catch (error) {
         return false
      }
   }
   const convertToUTC = date => {
      const newDate = new Date(date)
      const utcDate = newDate.toISOString()
      console.log('Date ' + utcDate)
      return utcDate
   }
   const generateLicenseKey = (license_plan_id, local_start_date) => {
      const license_key = crc32.str('' + license_plan_id + local_start_date).toString(16)
      return license_key
   }
   return function makeLicenseKe({
      id,
      license_key,
      utc_start_date,
      utc_expiry_date,
      local_start_date,
      local_expiry_date,
      timezone,
      is_active = true,
      current_num_of_users,
      license_plan_id,
      record_last_modified = Date.now(),
   } = {}) {
      if (!local_start_date) throw new Error('License keys must have a start date')
      if (!local_expiry_date) throw new Error('License keys must have a expiry date')
      if (!timezone) throw new Error('License keys must have a timezone')
      if (!verifyTimezone(timezone)) throw new Error('License keys timezone is invalid')
      if (!current_num_of_users) throw new Error('License keys must have current number of users')
      if (isNaN(current_num_of_users))
         throw new Error('License keys current number of users  must be number')
      if (!license_plan_id) throw new Error('License keys must have an license plan id')
      if (isNaN(license_plan_id)) throw new Error('License plan id must be number')

      return Object.freeze({
         getId: () => id,
         getLicenseKey: () => license_key,
         getUTCStartDate: () => utc_start_date,
         getUTCExpiryDate: () => utc_expiry_date,
         getLocalStartDate: () => local_start_date,
         getLocalExpiryDate: () => local_expiry_date,
         getTimezone: () => timezone,
         getCurrentNumOfUsers: () => current_num_of_users,
         getLicensePlanId: () => license_plan_id,
         getLastModified: () => record_last_modified,
         getIsActive: () => is_active,
         localToUtc: () => {
            utc_start_date = local_start_date
            utc_expiry_date = local_expiry_date
         },
         generateLicenseKey: () => {
            license_key = generateLicenseKey()
         },
      })
   }
}
