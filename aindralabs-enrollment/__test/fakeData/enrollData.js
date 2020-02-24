import faker from 'faker'

export default function makeFakeEnrollData(overrides) {
    const enrollData = {
      url: 'images/1552184111_12.8974162_77.5831673_19800.jpg',
      firebaseDeviceIdentifier: faker.random.uuid(),
      enrollmentStatus: false,
      person_id: faker.random.uuid(),
      organization_id: faker.random.uuid(),
      timestamp: faker.random.number(),
      longitude: faker.random.number(),
      latitude: faker.random.number(),
      timeZone: faker.random.number(),
      }
    return {
        ...enrollData,
        ...overrides
    }
}
