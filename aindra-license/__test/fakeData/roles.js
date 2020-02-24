import faker from 'faker'

export default function makeFakeRoles(overrides) {
   const role = {
      id: faker.random.number(),
      role_name: faker.name.jobTitle(),
      is_active: true,
      organization_id: faker.random.number(),
      parent_role: faker.random.number(),
      time_stamp: Date.now(),
      deleted: faker.random.boolean(),
   }
   return {
      ...role,
      ...overrides,
   }
}
