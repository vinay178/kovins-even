import faker from 'faker'

export default function makeFakeDepartment(overrides) {
   const department = {
      id: faker.random.number(),
      dept_name: faker.name.jobTitle(),
      parent_dept: faker.random.number(),
      is_active: true,
      organization_id: faker.random.number(),
      time_stamp: Date.now(),
      deleted: faker.random.boolean(),
   }
   return {
      ...department,
      ...overrides,
   }
}
