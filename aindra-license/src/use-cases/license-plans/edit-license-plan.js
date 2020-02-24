import makeLicensePlans from '../../entities/license-plans'
const makeEditLicensePlan = ({ licensePlansDb }) => {
   const editLicensePlan = async ({ id, ...changes }) => {
      if (!id) throw new Error('Id is required')

      const existing = await licensePlansDb.findById({ id })

      if (!existing) throw new RangeError('License Plan not found.')

      const licensePlan = makeLicensePlans({ ...existing, ...changes })

      const updated = licensePlansDb.update({
         id: id,
         license_plan_name: licensePlan.getLicensePlanName(),
         license_validity_period_days: licensePlan.getLicenseValidityPeriod(),
         license_max_user_count: licensePlan.getLicenseMaxUserCount(),
         license_other_criteria: licensePlan.getLicenseOtherCriteria(),
      })
      return { ...existing, ...changes }
   }
   return editLicensePlan
}

export default makeEditLicensePlan
