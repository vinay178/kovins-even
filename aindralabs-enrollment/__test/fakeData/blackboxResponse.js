import faker from 'faker'

export default function makeFakeBlackboxResponse(overrides) {
    const fakeBlackboxRepsonse = {
      userInfo_OID: faker.random.number(),
      userInfo_UID: faker.random.number(),
      enrollmentStatus: false,
      successUrls : {
        url1: 'images/1571114724329-1552184111_12.8974162_77.5831673_198000.jpg',
        url2: 'images/1571114724329-1552184111_12.8974162_77.5831673_198000.jpg',
        url3: 'images/1571114724329-1552184111_12.8974162_77.5831673_198000.jpg',
        url4: 'images/1571114724329-1552184111_12.8974162_77.5831673_198000.jpg',
        url5: 'images/1571114724329-1552184111_12.8974162_77.5831673_198000.jpg',
      },
      failedUrls: {},
      livelinessFailed: true,
      errorMessage: ""
    }
    return {
        ...fakeBlackboxRepsonse,
        ...overrides
    }
}
