const log = require('../../helpers/log')
require("dotenv").config();

export default function makePostEnrollment ({addEnrollment, handleBlackboxReq, formatBlackboxRequest, auditUseCase}) {
  return async function postEnrollment (httpRequest) {

    const headers = {
      'Content-Type': 'application/json',
      'Last-Modified': new Date().toUTCString()
    }

    let url =  process.env.BLACKBOX_URL
    let svsURL = process.env.SVS_URL
    let replyUrl = process.env.REPLY_URL_ENROLLMENT

    try {
      let correlationId = httpRequest.correlationId
      let enrollInfo = httpRequest.body
      enrollInfo["files"] = httpRequest.files

      //post enrollment data into the Database
      const response = await addEnrollment({ ...enrollInfo })
      log.info({ response , status: 'POST_ENROLLMENT_TO_DB', correlationId });
      await auditUseCase.insert({ correlationId, status: 'POST_ENROLLMENT_TO_DB', data: JSON.stringify(response) })

      // format request for blackBox
      const blackboxReqFormatResponse =  await formatBlackboxRequest(response.enroll_data.urls, response.enrollmentInfo, svsURL, replyUrl)
      log.info({ response: blackboxReqFormatResponse , status: 'FORMAT_REQ_FOR_BLACKBOX', correlationId });
      await auditUseCase.update({ correlationId, status: 'FORMAT_REQ_FOR_BLACKBOX', data: JSON.stringify(blackboxReqFormatResponse) })

      // send request to blackbox
      let blackboxResponse = await handleBlackboxReq({blackboxReqFormatResponse, url});
      log.info({ response: blackboxResponse , status: 'REQ_SENT_TO_BLACKBOX_COMPLETED', correlationId });
      await auditUseCase.update({ correlationId, status: 'REQ_SENT_TO_BLACKBOX_COMPLETED', data: JSON.stringify(blackboxResponse) })

      blackboxResponse["firebaseDeviceIdentifier"] = enrollInfo.firebaseDeviceIdentifier

      let resp = {
        headers,
        statusCode: 201,
        body: {
          firebaseDeviceIdentifier: enrollInfo.firebaseDeviceIdentifier,
          apiSuccessStatus: true,
          apiErrMessage: ""
        }
      }
      return resp

    } catch (e) {

      let resp = {
        headers,
        statusCode: 400,
        body: {
          apiSuccessStatus: false,
          apiErrMessage: e.message
        }
      }
      return resp

    }

  };
}
