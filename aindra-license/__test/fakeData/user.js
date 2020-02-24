import faker from 'faker'

export default function makeFakeDepartment(overrides) {
   const department = {
      id: faker.random.number(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      gender: 'male',
      emailaddress: faker.internet.email(),
      phone_number: faker.phone.phoneNumber(),
      roles_id: faker.random.number(),
      department_id: faker.random.number(),
      locations_id: faker.random.number(),
      manager_id: faker.random.number(),
      is_active: true,
      time_stamp: Date.now(),
      deleted: faker.random.boolean(),
   }
   return {
      ...department,
      ...overrides,
   }
}
