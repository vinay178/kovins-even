import makeAddVerification from './add-verification'
import makeUpdateVerification from './update-verification'
import makeFormatBlackboxRequestVerification from './format-blackbox-req-verification'
import makeHandleBlackboxReqVerification from './handle-blackbox-req-verification'
import makeGetFirebaseIdVerification from './get-firebaseId-verification'
import { enrollmentDb, verificationDb } from '../../data-access'

const addVerification = makeAddVerification({ verificationDb });
const updateVerification = makeUpdateVerification({ verificationDb });
const formatBlackboxRequestVerification = makeFormatBlackboxRequestVerification({ enrollmentDb });
const handleBlackboxReqVerification = makeHandleBlackboxReqVerification();
const getFirebaseIdVerification = makeGetFirebaseIdVerification({ verificationDb })

export {
  addVerification, updateVerification, formatBlackboxRequestVerification, handleBlackboxReqVerification, getFirebaseIdVerification
 }
