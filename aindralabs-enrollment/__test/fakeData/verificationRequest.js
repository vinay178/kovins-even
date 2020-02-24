import faker from 'faker'

export default function makeFakeVerificationRequest(overrides) {
    const verificationRequest = {
      firebaseDeviceIdentifier:  faker.random.uuid(),
      jobType: 'VERIFY',
      jobId: faker.random.number(),
      userInfo_OID: faker.random.number(),
      userInfo_UID: faker.random.number(),
      date: '2019-10-19',
      sessionType: 4,
      files: [
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'},
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'},
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'}
       ],
      filenames: [
        '1552184111_12.8974162_77.5831673_19800.jpg',
        '1552184111_12.8974162_77.5831673_19800.jpg',
        '1552184111_12.8974162_77.5831673_19800.jpg',
        ],
    }
    return {
        ...verificationRequest,
        ...overrides
    }
}
