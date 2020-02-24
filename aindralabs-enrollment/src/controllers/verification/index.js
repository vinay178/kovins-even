import makePostVerification  from './post-verification'
import makePostVerificationBlackbox  from './post-verification-blackbox'

import { auditUseCase } from '../../use-cases/audit'
import { addVerification, updateVerification, formatBlackboxRequestVerification, handleBlackboxReqVerification, getFirebaseIdVerification } from '../../use-cases/verification'
import  firebaseNotification  from '../../firebase'

const postVerification = makePostVerification({
  addVerification,
  formatBlackboxRequestVerification,
  handleBlackboxReqVerification,
  auditUseCase,
  firebaseNotification
})

const postVerificationBlackbox = makePostVerificationBlackbox({
  updateVerification,
  auditUseCase,
  getFirebaseIdVerification,
  firebaseNotification
 });


export  { postVerification, postVerificationBlackbox }
