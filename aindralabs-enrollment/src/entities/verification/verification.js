
export default function buildMakeVerification({ extractDataFromFileName }) {
  return function makeVerification({
    firebaseDeviceIdentifier,
    jobType,
    jobId,
    userInfo_OID,
    userInfo_UID,
    sessionType,
    date,
    files,
    filenames

  } = {}) {

    if (!firebaseDeviceIdentifier) {
        throw new Error('firebaseDeviceIdentifier missing');
    }
    if (!jobType || jobType !== 'VERIFY') {
        throw new Error('jobType must be VERIFY');
    }
    if (!userInfo_OID) {
        throw new Error('verifying user must have a userInfo_OID.')
    }
    if (!userInfo_UID) {
        throw new Error('verifying user must have a userInfo_UID.')
    }
    if (!sessionType || sessionType < 1 || isNaN(sessionType)) {
      throw new Error('sessionType must be between 1 to n')
    }
    if (isNaN(Date.parse(date))) {
      throw new Error(`date is invalid!`)
    }
    if (!jobId) {
        throw new Error('job ID missing')
    }
    if (!files) {
        throw new Error('verify must have files')
    }
    if(!(files && files.length === 3)) {
        throw new Error('verifying user must upload atleast 3 files')
    }
    if (!filenames) {
        throw new Error('verify must contain filenames.')
    }
    if(!(filenames && filenames.length === 3)) {
        throw new Error('verifying user must upload atleast 3 filesnames')
    }


    let verify_arr = [];
    const urls = [];

    files.forEach((element, index) => {
      let verify_data = {};

        verify_data = extractDataFromFileName(element.originalname)
        verify_data['jobId'] = jobId;
        verify_data['person_id'] = userInfo_UID;
        verify_data['organization_id'] = userInfo_OID;
        verify_data['firebaseDeviceIdentifier'] = firebaseDeviceIdentifier;
        verify_data['sessionType'] = sessionType;

        verify_data['url'] = element.path;
        urls.push(verify_data.url);

        verify_arr.push(verify_data);
    });

    const obj = {}
    obj['verify_arr'] = verify_arr;
    obj['urls'] = urls;

    // console.log(obj);
    return obj
  }
}
