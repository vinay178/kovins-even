import faker from 'faker'

export default function makeFakeVerificationData(overrides) {
    const verificationData = {
      url: 'images/1552184111_12.8974162_77.5831673_19800.jpg',
      firebaseDeviceIdentifier: faker.random.uuid(),
      person_id: faker.random.uuid(),
      jobId: faker.random.uuid(),
      organization_id: faker.random.uuid(),
      timestamp: faker.random.number(),
      longitude: faker.random.number(),
      latitude: faker.random.number(),
      timeZone: faker.random.number(),
      verificationStatus: 'VERIFIED_DIFFERENT',
      livelinessFailed: false,
      x: 1,
      y: 2,
      w: 3.0,
      h: 2.9
      }
    return {
        ...verificationData,
        ...overrides
    }
}
