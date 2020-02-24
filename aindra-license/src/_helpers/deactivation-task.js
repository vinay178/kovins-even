import { licenseKeysDb } from '../data-access'

const deactivateLicenseKeys = async () => {
   const licenseKeysFromDb = await licenseKeysDb.findAll()
   const licenseKeys = licenseKeysFromDb.map(licenseKey => licenseKey.dataValues)
   const current_date = new Date()
   licenseKeys.forEach(async licenseKey => {
      const convert_to_local = current_date.toLocaleString('en-Us', {
         timeZone: licenseKey.timezone,
      })
      const current_utc_date = new Date(convert_to_local)
      const utc_expiry_date = new Date(licenseKey.utc_expiry_date)
      // Uncomment the below line to check if the deactivation is working
      // console.log(current_utc_date, convert_to_local, utc_expiry_date)
      if (current_utc_date > utc_expiry_date) {
         await licenseKeysDb.update({ ...licenseKey, is_active: false })
      }
   })
}
export default deactivateLicenseKeys
