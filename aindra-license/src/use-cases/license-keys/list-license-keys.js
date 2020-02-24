const makeListLicenseKeys = ({ licenseKeysDb }) => {
   const listLicenseKeys = async () => {
      const licenseKeys = await licenseKeysDb.findAll()
      return licenseKeys
   }
   return listLicenseKeys
}
export default makeListLicenseKeys
