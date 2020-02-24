import faker from 'faker'

export default function makeFakeEnrollmentRequest(overrides) {
    const enrollmentRequest = {
      firebaseDeviceIdentifier:  faker.random.uuid(),
      jobType: 'ENROLL',
      jobId: faker.random.uuid(),
      userInfo_OID: faker.random.uuid(),
      userInfo_UID: faker.random.uuid(),
      retryCount: 5,
      files: [
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'},
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'},
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'},
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'},
        { path: 'images/1552184111_12.8974162_77.5831673_19800.jpg' , originalname: '1552184111_12.8974162_77.5831673_19800.jpg'}
       ],
      filenames: [
        '1552184111_12.8974162_77.5831673_19800.jpg',
        '1552184111_12.8974162_77.5831673_19800.jpg',
        '1552184111_12.8974162_77.5831673_19800.jpg',
        '1552184111_12.8974162_77.5831673_19800.jpg',
        '1552184111_12.8974162_77.5831673_19800.jpg'
        ],
    }
    return {
        ...enrollmentRequest,
        ...overrides
    }
}
