import makeLicensePlans from '../../entities/license-plans'
const makeAddLicensePlan = ({ licensePlansDb }) => {
   const addLicensePlan = async licensePlanInfo => {
      const licensePlan = makeLicensePlans(licensePlanInfo)
      return licensePlansDb.create({
         license_plan_name: licensePlan.getLicensePlanName(),
         license_validity_period_days: licensePlan.getLicenseValidityPeriod(),
         license_max_user_count: licensePlan.getLicenseMaxUserCount(),
         license_other_criteria: licensePlan.getLicenseOtherCriteria(),
      })
   }
   return addLicensePlan
}

export default makeAddLicensePlan
