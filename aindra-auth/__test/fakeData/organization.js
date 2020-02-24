import faker from 'faker'

export default function makeOrganization(overrides) {
   const organization = {
      id: faker.random.number(),
      org_name: faker.name.jobTitle(),
      smart_verification_type: 'verification',
      geofencing_active: faker.random.boolean(),
      geofencing_radius: faker.random.number(),
      geo_fencing_type_id: faker.random.number(),
      website_access_active: faker.random.boolean(),
      license_plan_type: faker.name.title(),
      license_key: faker.random.alphaNumeric(),
      is_active: true,
      country_id: faker.random.number(),
      deleted: faker.random.boolean(),
   }
   return {
      ...organization,
      ...overrides,
   }
}
