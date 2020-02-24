import makeAuditEnrollmentUseCase from './audit'
import { enrollmentDb, auditDb, verificationDb } from '../../data-access'


const auditUseCase = makeAuditEnrollmentUseCase({ auditDb });

export { auditUseCase }
