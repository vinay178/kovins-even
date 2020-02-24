import makeAddEnrollment from './add-enrollment'
import makeUpdateEnrollment from './update-enrollment'
import makeFormatBlackboxRequest from './format-blackbox-req'
import makeHandleBlackboxReq from './handle-blackbox-req'
import makeGetFirebaseId from './get-firebaseId'

import { enrollmentDb } from '../../data-access'


const addEnrollment = makeAddEnrollment({ enrollmentDb });
const updateEnrollment = makeUpdateEnrollment({ enrollmentDb });
const formatBlackboxRequest = makeFormatBlackboxRequest();
const handleBlackboxReq = makeHandleBlackboxReq();
const getFirebaseId = makeGetFirebaseId({ enrollmentDb })



export {
  addEnrollment, updateEnrollment, formatBlackboxRequest, handleBlackboxReq, getFirebaseId,
 }
