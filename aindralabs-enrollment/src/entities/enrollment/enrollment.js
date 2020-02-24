
export default function buildMakeEnrolment({extractDataFromFileName}) {
  return function makeEnrolment({
      firebaseDeviceIdentifier,
      jobType,
      jobId,
      userInfo_OID,
      userInfo_UID,
      retryCount,
      files,
      filenames

  } = {}) {

    let maxRetryCount =  parseInt(process.env.MAX_RETRY_COUNT)

    if (!firebaseDeviceIdentifier) {
        throw new Error('firebaseDeviceIdentifier missing');
    }
    if (!jobType || jobType !== 'ENROLL') {
        throw new Error('jobType must be ENROLL');
    }
    if (!userInfo_OID) {
        throw new Error('enrolling user must have a userInfo_OID.')
    }
    if (!userInfo_UID) {
        throw new Error('enrolling user must have a userInfo_UID.')
    }
    if (!jobId) {
        throw new Error('job ID missing')
    }
    if (!retryCount ) {
        throw new Error('retry count missing')
    }
    if (retryCount < 0 || isNaN(retryCount)) {
        throw new Error('retry count must be positive integer')
    }
    if (retryCount > maxRetryCount) {
        throw new ReferenceError('Maximum Retry count reached . Please Contact Administrator')
    }
    if (!files) {
        throw new Error('enroll must have files')
    }
    if(!(files && files.length === 5)) {
        throw new Error('enrolling user must upload atleast 5 files')
    }
    if (!filenames) {
        throw new Error('enroll must contain filenames.')
    }
    if(!(filenames && filenames.length === 5)) {
        throw new Error('enrolling user must upload atleast 5 filesnames')
    }


    let enroll_arr = [];
    const urls = [];

    files.forEach((element, index) => {
        let enroll_data = {};

        enroll_data = extractDataFromFileName(element.originalname)
        enroll_data['jobId'] = jobId;
        enroll_data['person_id'] = userInfo_UID;
        enroll_data['organization_id'] = userInfo_OID;
        enroll_data['firebaseDeviceIdentifier'] = firebaseDeviceIdentifier;

        enroll_data['url'] = element.path;
        urls.push(enroll_data.url);

        enroll_arr.push(enroll_data);
    });

    const obj = {}
    obj['enroll_arr'] = enroll_arr;
    obj['urls'] = urls;

    return obj
  }
}
