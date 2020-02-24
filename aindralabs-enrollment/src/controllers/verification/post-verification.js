const log = require('../../helpers/log')

export default function makePostVerification ({addVerification, formatBlackboxRequestVerification, handleBlackboxReqVerification, auditUseCase, firebaseNotification}) {
  return async function postVerification (httpRequest) {

    const headers = {
      'Content-Type': 'application/json',
      'Last-Modified': new Date().toUTCString()
    }
    let url =  process.env.BLACKBOX_URL_VERIFICATION
    let svsURL = process.env.SVS_URL
    let replyUrl = process.env.REPLY_URL_VERIFICATION

    try {
      let correlationId = httpRequest.correlationId
      let verifyInfo = httpRequest.body
      verifyInfo["files"] = httpRequest.files

      //post enrollment data into the Database
      const response = await addVerification({ ...verifyInfo })
      log.info({ response , status: 'POST_VERIFICATION_TO_DB', correlationId });
      await auditUseCase.insert({ correlationId, status: 'POST_VERIFICATION_TO_DB', data: JSON.stringify(response) })

      // format request for blackBox
      const blackboxReqFormatResponse =  await formatBlackboxRequestVerification(response, replyUrl, svsURL)

      if (blackboxReqFormatResponse.verifyImages.length === 0) {
        const notificationMessageTitle = 'verification not completed .'
        const notificationMessageBody = "please wait for enrollment process completion"

        let result = await firebaseNotification( notificationMessageTitle, notificationMessageBody, verifyInfo.firebaseDeviceIdentifier)
        log.info({ response: {notificationMessageTitle, notificationMessageBody } , status: 'UNVERIFIED_NOTIFICATION_TO_VERIFICATION_CLIENT_COMPLETED', correlationId });
        await auditUseCase.update({ correlationId, status: 'UNVERIFIED_NOTIFICATION_TO_VERIFICATION_CLIENT_COMPLETED', data: notificationMessageTitle })
      }
      else {
        log.info({ response: blackboxReqFormatResponse , status: 'FORMAT_REQ_FOR_BLACKBOX_VERIFICATION', correlationId });
        await auditUseCase.update({ correlationId, status: 'FORMAT_REQ_FOR_BLACKBOX_VERIFICATION', data: JSON.stringify(blackboxReqFormatResponse) })

        let blackboxResponse = await handleBlackboxReqVerification({blackboxReqFormatResponse, url});
        log.info({ response: blackboxResponse , status: 'REQ_SENT_TO_VERIFICATION_BLACKBOX_COMPLETED', correlationId });
        await auditUseCase.update({ correlationId, status: 'REQ_SENT_TO_VERIFICATION_BLACKBOX_COMPLETED', data: JSON.stringify(blackboxResponse) })
      }

      let resp = {
        headers,
        statusCode: 201,
        body: {
          firebaseDeviceIdentifier: verifyInfo.firebaseDeviceIdentifier,
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
