import makeLicenseKey from '../../entities/license-keys'
const makeEditLicenseKey = ({ licenseKeysDb }) => {
   const editLicenseKey = async ({ id, ...changes }) => {
      if (!id) throw new Error('Id is required')

      const existing = await licenseKeysDb.findById({ id })

      if (!existing) throw new RangeError('License key not found.')

      const licenseKey = makeLicenseKey({ ...existing, ...changes })
      // Must call the flowing two function before saving
      licenseKey.localToUtc()
      licenseKey.generateLicenseKey()
      const updated = await licenseKeysDb.update({
         id,
         license_key: licenseKey.getLicenseKey(),
         utc_start_date: licenseKey.getUTCStartDate(),
         utc_expiry_date: licenseKey.getUTCExpiryDate(),
         timezone: licenseKey.getTimezone(),
         is_active: licenseKey.getIsActive(),
         current_num_of_users: licenseKey.getCurrentNumOfUsers(),
         license_plan_id: licenseKey.getLicensePlanId(),
         record_last_modified: licenseKey.getLastModified(),
      })
      const updatedInfo = await licenseKeysDb.findById({ id })
      return { ...updatedInfo, ...changes }
   }
   return editLicenseKey
}

export default makeEditLicenseKey
