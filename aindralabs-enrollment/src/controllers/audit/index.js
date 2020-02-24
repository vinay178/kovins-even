import makeAuditController from './audit-controller';

import { auditUseCase } from '../../use-cases/audit'
import { formatBlackboxRequest, handleBlackboxReq } from '../../use-cases/enrollment'
import { formatBlackboxRequestVerification, handleBlackboxReqVerification } from '../../use-cases/verification'
import  firebaseNotification  from '../../firebase'


const auditController = makeAuditController({
  handleBlackboxReq,
  formatBlackboxRequest,
  auditUseCase,
  firebaseNotification,
  handleBlackboxReqVerification,
  formatBlackboxRequestVerification
});


export  { auditController }
