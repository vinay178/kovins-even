import makePostEnrollment  from './post-enrollment'
import makePostBlackbox from './post-blackbox';

import { auditUseCase } from '../../use-cases/audit'
import { addEnrollment, updateEnrollment, formatBlackboxRequest, handleBlackboxReq, getFirebaseId  } from '../../use-cases/enrollment'
import  firebaseNotification  from '../../firebase'

const postEnrollment = makePostEnrollment({
  addEnrollment,
  handleBlackboxReq,
  formatBlackboxRequest,
  auditUseCase
})

const postBlackbox = makePostBlackbox({
  updateEnrollment,
  firebaseNotification,
  auditUseCase,
  getFirebaseId
 });

export  { postEnrollment, postBlackbox }
