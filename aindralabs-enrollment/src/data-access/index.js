import makeEnrollmentDb from './enrollment-db';
import makeVerificationDb from './verification-db';
import makeAuditDb from './audit-db';

const enrollment = require('../models/index').enrollment;
const verificationImage = require('../models/index').verificationImage;
const audit = require('../models/index').audit;
const Op = require('../models/index').Op;

const enrollmentDb = makeEnrollmentDb({ enrollment });
const verificationDb = makeVerificationDb({ verificationImage });
const auditDb = makeAuditDb({ audit, Op });


export { enrollmentDb, auditDb, verificationDb }
