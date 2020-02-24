import makeAddEnrollment from './add-enrollment'
import makeFormatBlackboxRequest from './format-blackbox-req'
import makeEnrollmentDb from '../../data-access/enrollment-db'

import makeFakeEnrollmentRequest from "../../../__test/fakeData/enrollmentRequest";
import makeFakeBlackboxRequest from "../../../__test/fakeData/blackboxRequest";

const enrollment = require("../../../__test/db/index").enrollment;
const expect = require("chai").expect;



describe('Format Blackbox Request Use Case', () => {
    let enrollmentRequest;
    let enrollmentDb;
    beforeEach(() => {
      enrollmentRequest = makeFakeEnrollmentRequest({ jobType: 'ENROLL'})   //fake enrollment Request

      enrollmentDb = makeEnrollmentDb({ enrollment });

    })

    it("format request for blackbox call", async () => {
      const addEnrollment = makeAddEnrollment({ enrollmentDb })
      let response = await addEnrollment(enrollmentRequest)


      const expected = makeFakeBlackboxRequest({
        jobType: enrollmentRequest.jobType,
        jobId: enrollmentRequest.jobId,
        userInfo_OID: enrollmentRequest.userInfo_OID,
        userInfo_UID: enrollmentRequest.userInfo_UID,
        retryCount: enrollmentRequest.retryCount,
      })

      const formatBlackboxRequest = makeFormatBlackboxRequest()
      let formatedBlackBoxRequest = await formatBlackboxRequest(response.enroll_data.urls, response.enrollmentInfo)
      expected.enrollImages = formatedBlackBoxRequest.enrollImages
      expected.replyUrl = formatedBlackBoxRequest.replyUrl


      expect(expected).to.eql(formatedBlackBoxRequest)
    })
})
