const log = require('../../helpers/log')

export default function makePostVerificationBlackbox({updateVerification, auditUseCase, getFirebaseIdVerification, firebaseNotification}) {
  return async function postVerificationBlackbox(httpRequest) {
    try {
      console.log('httpRequest.body',httpRequest.body);
      const blackBoxReq = httpRequest.body
      const correlationId = httpRequest.correlationId
      if (!blackBoxReq.userInfo_UID ) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: 'userInfo_UID missing'
          }
        }
      }
      else if(!blackBoxReq.userInfo_OID ){
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: 'userInfo_OID missing'
          }
        }
      }
      else if(!blackBoxReq.jobId ){
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: 'jobId missing'
          }
        }
      }

      const firebaseDeviceIdentifier = await getFirebaseIdVerification({person_id:blackBoxReq.userInfo_UID, organization_id: blackBoxReq.userInfo_OID, jobId:blackBoxReq.jobId})
      let response = {}
      let updated_enroll_data = {};
      let blackBoxReqUrl = blackBoxReq.urls
      updated_enroll_data['livelinessFailed'] = blackBoxReq.livelinessFailed
      updated_enroll_data['verificationStatus'] = blackBoxReq.verificationStatus
      updated_enroll_data['confidentiality'] = blackBoxReq.confidentiality
      let i = 0 ;
      let urls = []
      while (i <= 25) {
        if (blackBoxReqUrl[`url${i}`]) {
          let obj = {}
          obj[`url`] = blackBoxReqUrl[`url${i}`]
          obj[`bbox`] = blackBoxReqUrl[`bbox${i}`]
          urls.push(obj )
        }
        i++
      }
      updated_enroll_data['urls'] = urls;
      updated_enroll_data['person_id'] = blackBoxReq.userInfo_UID;
      updated_enroll_data['organization_id'] = blackBoxReq.userInfo_OID;
      updated_enroll_data['jobId'] = blackBoxReq.jobId;

      response = await updateVerification({...updated_enroll_data});
      log.info({ response , status: 'UPDATE_VERIFICATION_DB', correlationId });
      await auditUseCase.insert({ correlationId, status: 'UPDATE_VERIFICATION_DB', data: JSON.stringify(firebaseDeviceIdentifier) })

      let notificationMessageTitle = 'verification failed .'
      let notificationMessageBody = blackBoxReq.errorMessage
      if (blackBoxReq.verificationStatus === 'VERIFIED SAME') {
        notificationMessageTitle = 'verification success .'
        notificationMessageBody = 'verification has been completed'
      }

      let result = await firebaseNotification( notificationMessageTitle, notificationMessageBody, firebaseDeviceIdentifier)
      log.info({ response: {notificationMessageTitle, notificationMessageBody } , status: 'NOTIFICATION_TO_VERIFICATION_CLIENT_COMPLETED', correlationId });
      await auditUseCase.update({ correlationId, status: 'NOTIFICATION_TO_VERIFICATION_CLIENT_COMPLETED', data: notificationMessageTitle })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 200,
        body: {
          verificationStatus: blackBoxReq.verificationStatus
       }
      }

    } catch (e) {
      console.log('error', e.message);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
