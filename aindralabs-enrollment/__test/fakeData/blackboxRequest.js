import faker from 'faker'

export default function makeFakeBlackboxRequest(overrides) {
    const fakeBlackboxRequest = {
      jobType: 'ENROLL',
      jobId: faker.random.number(),
      userInfo_OID: faker.random.number(),
      userInfo_UID: faker.random.number(),
      retryCount: 5,
      enrollImages: {
        imageurl1: '',
        imageurl2: '',
        imageurl3: '',
        imageurl4: '',
        imageurl5: '',
      },
    }
    return {
        ...fakeBlackboxRequest,
        ...overrides
    }
}
