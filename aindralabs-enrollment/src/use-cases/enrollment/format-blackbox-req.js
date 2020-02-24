
export default function makeFormatBlackboxRequest() {
  return async function formatBlackboxRequest(urls, enroll_data, svsURL, replyUrl) {

    delete enroll_data['firebaseDeviceIdentifier'];
    delete enroll_data['filenames'];
    delete enroll_data['files'];

    const enrolBlackBoxReq = {...enroll_data}

    enrolBlackBoxReq['replyUrl'] = replyUrl

    enrolBlackBoxReq['enrollImages'] = {}
    enrolBlackBoxReq['enrollImages'].imageurl1 = svsURL + '/' + urls[0];
    enrolBlackBoxReq['enrollImages'].imageurl2 = svsURL + '/' +urls[1];
    enrolBlackBoxReq['enrollImages'].imageurl3 = svsURL + '/' + urls[2];
    enrolBlackBoxReq['enrollImages'].imageurl4 = svsURL + '/' + urls[3];
    enrolBlackBoxReq['enrollImages'].imageurl5 = svsURL + '/' + urls[4];

    return enrolBlackBoxReq
  }
}
