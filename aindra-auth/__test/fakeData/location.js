import faker from 'faker'

export default function makeOrganization(overrides) {
   const organization = {
      id: faker.random.number(),
      name: faker.name.jobTitle(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      pincode: faker.address.zipCode(),
      organization_id: faker.random.number(),
      is_active: true,
      country_id: faker.random.number(),
      time_stamp: Date.now(),
      deleted: faker.random.boolean(),
   }
   return {
      ...organization,
      ...overrides,
   }
}
