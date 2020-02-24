const makeListLicensePlans = ({ licensePlansDb }) => {
   const listLicensePlans = async () => {
      const licensePlans = await licensePlansDb.findAll()
      return licensePlans
   }
   return listLicensePlans
}
export default makeListLicensePlans
