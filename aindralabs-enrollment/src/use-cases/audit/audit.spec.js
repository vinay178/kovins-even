import makeAuditEnrollmentUseCase from './audit'
import makeAuditDb from '../../data-access/audit-db'

import makeFakeEnrollmentRequest from "../../../__test/fakeData/enrollmentRequest";
import makeFakeBlackboxRequest from "../../../__test/fakeData/blackboxRequest";
import makeFakeAuditData from "../../../__test/fakeData/auditData";

const audit = require("../../../__test/db/index").audit;
const expect = require("chai").expect;



describe('Audit Use Case', () => {
    let auditUseCase;
    let auditDb;
    let fakeAuditData = makeFakeAuditData()

    beforeEach(() => {
      auditDb = makeAuditDb({ audit });
      auditUseCase = makeAuditEnrollmentUseCase({auditDb})
    })

    it("insert audit data in to database", async () => {
      const insertToAudit = auditUseCase.insert

      const actual = fakeAuditData
      const expected = (await insertToAudit(fakeAuditData)).dataValues
      actual.createdAt = expected.createdAt
      actual.updatedAt = expected.updatedAt

      expect(expected).to.eql(actual)
    })


    it("update audit data ", async () => {
      const updateAudit = auditUseCase.update

      fakeAuditData.status = "REQ_SENT_TO_BLACKBOX_COMPLETED"
      const actual = fakeAuditData

      const expected = (await updateAudit({...fakeAuditData}))[0]

      expect(expected).to.eql(1)
    })
})
