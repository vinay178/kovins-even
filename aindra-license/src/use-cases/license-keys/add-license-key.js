import makeLicenseKey from '../../entities/license-keys'

const makeAddLicenseKey = ({ licenseKeysDb }) => {
   const addLicenseKey = async licenseKeyInfo => {
      const licenseKey = makeLicenseKey(licenseKeyInfo)
      // Must call the flowing two function before saving
      licenseKey.localToUtc()
      licenseKey.generateLicenseKey()

      return licenseKeysDb.create({
         license_key: licenseKey.getLicenseKey(),
         utc_start_date: licenseKey.getUTCStartDate(),
         utc_expiry_date: licenseKey.getUTCExpiryDate(),
         timezone: licenseKey.getTimezone(),
         is_active: licenseKey.getIsActive(),
         current_num_of_users: licenseKey.getCurrentNumOfUsers(),
         license_plan_id: licenseKey.getLicensePlanId(),
         record_last_modified: licenseKey.getLastModified(),
      })
   }
   return addLicenseKey
}

export default makeAddLicenseKey
