require("dotenv").config();
const log = require('../../helpers/log')

export default function makeAuditController({
  handleBlackboxReq, formatBlackboxRequest, auditUseCase, firebaseNotification,
  handleBlackboxReqVerification, formatBlackboxRequestVerification
}) {
  return async function auditController() {

    let data = await auditUseCase.getAll()
    let url =  process.env.BLACKBOX_URL
    let replyUrl =  process.env.REPLY_URL

    let incomplete = []
    data.map(item => {
      incomplete.push(item.dataValues)
    })

    if (incomplete.length === 0) {
      return ;
    }

    let date = new Date()

    for (var item of incomplete) {
      let { correlationId, status } = item
      let data = JSON.parse(item.data)

      switch (status) {

        case 'POST_ENROLLMENT_TO_DB':
        {
          try {
            log.info({ response: null , status: `server restarted at ${status}` , correlationId });
            const blackboxReqFormatResponse =  await formatBlackboxRequest(data.enroll_data.urls, data.enrollmentInfo)
            log.info({ response:blackboxReqFormatResponse , status: 'FORMAT_REQ_FOR_BLACKBOX', correlationId });
            await auditUseCase.update({ correlationId, status: 'FORMAT_REQ_FOR_BLACKBOX', data: JSON.stringify(blackboxReqFormatResponse) })

            // send request to blackbox
            const blackboxResponse = await handleBlackboxReq({blackboxReqFormatResponse, url});
            log.info({ response: blackboxResponse , status: 'REQ_SENT_TO_BLACKBOX_COMPLETED', correlationId });
            await auditUseCase.update({ correlationId, status: 'REQ_SENT_TO_BLACKBOX_COMPLETED', data: JSON.stringify(blackboxResponse) })
          } catch (e) {
            console.log(e);
          }
        }
        break ;


        case 'FORMAT_REQ_FOR_BLACKBOX':
        {
          try {
            log.info({ response: null , status: `server restarted at ${status}` , correlationId });
            // send request to blackbox
            const blackboxResponse = await handleBlackboxReq({ blackboxReqFormatResponse: data, url});
            log.info({ response: blackboxResponse , status: 'REQ_SENT_TO_BLACKBOX_COMPLETED', correlationId });
            await auditUseCase.update({ correlationId, status: 'REQ_SENT_TO_BLACKBOX_COMPLETED', data: JSON.stringify(blackboxResponse) })
          } catch (e) {
            console.log(e);
          }
        }
        break ;


        case 'UPDATE_ENROLLMENT_DB':
        {
          try {
            log.info({ response: null , status: `server restarted at ${status}` , correlationId });
            const notificationMessageTitle = 'enrollment success .'
            const notificationMessageBody = ' '

            // send firebase notification
            let firebaseDeviceIdentifier = data
            await firebaseNotification( notificationMessageTitle, notificationMessageBody, firebaseDeviceIdentifier )
            log.info({ response: {notificationMessageTitle, notificationMessageBody } , status: 'NOTIFICATION_TO_CLIENT_COMPLETED', correlationId });
            await auditUseCase.update({ correlationId, status: 'NOTIFICATION_TO_CLIENT_COMPLETED', data: notificationMessageTitle })
          } catch (e) {
            console.log(e);
          }
        }
        break ;

        case 'POST_VERIFICATION_TO_DB':
        {
          try {
            log.info({ response: null , status: `server restarted at ${status}` , correlationId });
            const blackboxReqFormatResponse =  await formatBlackboxRequestVerification(data, replyUrl)
            log.info({ response:blackboxReqFormatResponse , status: 'FORMAT_REQ_FOR_BLACKBOX_VERIFICATION', correlationId });
            await auditUseCase.update({ correlationId, status: 'FORMAT_REQ_FOR_BLACKBOX_VERIFICATION', data: JSON.stringify(blackboxReqFormatResponse) })

            // send request to blackbox
            const blackboxResponse = await handleBlackboxReqVerification({blackboxReqFormatResponse, url});
            log.info({ response: blackboxResponse , status: 'REQ_SENT_TO_VERIFICATION_BLACKBOX_COMPLETED', correlationId });
            await auditUseCase.update({ correlationId, status: 'REQ_SENT_TO_VERIFICATION_BLACKBOX_COMPLETED', data: JSON.stringify(blackboxResponse) })
          } catch (e) {
            console.log(e);
          }
        }
        break ;


        case 'FORMAT_REQ_FOR_BLACKBOX_VERIFICATION':
        {
          try {
            log.info({ response: null , status: `server restarted at ${status}` , correlationId });
            // send request to blackbox
            const blackboxResponse = await handleBlackboxReqVerification({ blackboxReqFormatResponse: data, url});
            log.info({ response: blackboxResponse , status: 'REQ_SENT_TO_VERIFICATION_BLACKBOX_COMPLETED', correlationId });
            await auditUseCase.update({ correlationId, status: 'REQ_SENT_TO_VERIFICATION_BLACKBOX_COMPLETED', data: JSON.stringify(blackboxResponse) })
          } catch (e) {
            console.log(e);
          }
        }
        break ;


        case 'UPDATE_VERIFICATION_DB':
        {
          try {
            log.info({ response: null , status: `server restarted at ${status}` , correlationId });
            const notificationMessageTitle = 'enrollment success .'
            const notificationMessageBody = ' '

            // send firebase notification
            let firebaseDeviceIdentifier = data
            await firebaseNotification( notificationMessageTitle, notificationMessageBody, firebaseDeviceIdentifier )
            log.info({ response: {notificationMessageTitle, notificationMessageBody } , status: 'NOTIFICATION_TO_VERIFICATION_CLIENT_COMPLETED', correlationId });
            await auditUseCase.update({ correlationId, status: 'NOTIFICATION_TO_VERIFICATION_CLIENT_COMPLETED', data: notificationMessageTitle })
          } catch (e) {
            console.log(e);
          }
        }
        break ;


        default:

      }
    }
  }
}
