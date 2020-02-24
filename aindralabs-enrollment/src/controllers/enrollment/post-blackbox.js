const log = require('../../helpers/log')

export default function makePostBlackbox({updateEnrollment, firebaseNotification, auditUseCase, getFirebaseId}) {
  return async function postBlackbox(httpRequest) {

    try {
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
      else if (!blackBoxReq.successUrls) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: 'successUrls missing'
          }
        }
      }
      else if (!blackBoxReq.failedUrls) {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 400,
          body: {
            error: 'failedUrls missing'
          }
        }
      }

      const firebaseDeviceIdentifier = await getFirebaseId({person_id:blackBoxReq.userInfo_UID, organization_id: blackBoxReq.userInfo_OID})
      let response = {}
      let updated_enroll_data = {};
      updated_enroll_data['successUrls'] = Object.values(blackBoxReq.successUrls);
      updated_enroll_data['failedUrls'] = Object.values(blackBoxReq.failedUrls);
      updated_enroll_data['person_id'] = blackBoxReq.userInfo_UID;
      updated_enroll_data['organization_id'] = blackBoxReq.userInfo_OID;
      updated_enroll_data['livelinessFailed'] = blackBoxReq.livelinessFailed
      updated_enroll_data['enrollmentStatus'] = blackBoxReq.enrollmentStatus

      console.log('updated_enroll_data',updated_enroll_data);
      response = await updateEnrollment({...updated_enroll_data});
      log.info({ response , status: 'UPDATE_ENROLLMENT_DB', correlationId });
      await auditUseCase.insert({ correlationId, status: 'UPDATE_ENROLLMENT_DB', data: JSON.stringify(firebaseDeviceIdentifier) })


      let notificationMessageTitle = 'enrollment success .'
      if (!blackBoxReq.enrollmentStatus || blackBoxReq.enrollmentStatus === 'false') {
         notificationMessageTitle = 'enrollment failed .'
      }
      const notificationMessageBody = blackBoxReq.errorMessage

      await firebaseNotification( notificationMessageTitle, notificationMessageBody, firebaseDeviceIdentifier)
      log.info({ response: {notificationMessageTitle, notificationMessageBody } , status: 'NOTIFICATION_TO_CLIENT_COMPLETED', correlationId });
      await auditUseCase.update({ correlationId, status: 'NOTIFICATION_TO_CLIENT_COMPLETED', data: notificationMessageTitle })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 200,
        body: {
          enrollmentStatus: blackBoxReq.enrollmentStatus
        }
      }

    } catch (e) {
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
