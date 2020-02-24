import makeAddVerification from './add-verification'
import makeFormatBlackboxRequestVerification from './format-blackbox-req-verification'
import makeVerificationDb from '../../data-access/verification-db'
import makeEnrollmentDb from '../../data-access/enrollment-db'

import makeFakeVerificationRequest from "../../../__test/fakeData/verificationRequest";
import makeFakeBlackboxRequestVerification from "../../../__test/fakeData/blackboxRequestVerification";

const verificationImage = require("../../../__test/db/index").verificationImage;
const enrollment = require("../../../__test/db/index").enrollment;
const expect = require("chai").expect;



describe('Format Verification Blackbox Request Use Case', () => {
    let verificationRequest;
    let verificationDb;
    let enrollmentDb;
    beforeEach(() => {
      verificationRequest = makeFakeVerificationRequest({ jobType: 'VERIFY'})   //fake verification Request
      verificationDb = makeVerificationDb({ verificationImage });
      enrollmentDb = makeEnrollmentDb({enrollment})
    })

    it("format request for blackbox call", async () => {
      const addVerification = makeAddVerification({ verificationDb })
      let response = await addVerification(verificationRequest)

      const expected = makeFakeBlackboxRequestVerification({
        jobType: verificationRequest.jobType,
        jobId: verificationRequest.jobId,
        replyUrl: "http://localhost/api/blackbox",
        userInfo_OID: verificationRequest.userInfo_OID,
        userInfo_UID: verificationRequest.userInfo_UID,
      })

      const formatBlackboxRequest = makeFormatBlackboxRequestVerification({enrollmentDb})
      let formatedBlackBoxRequest = await formatBlackboxRequest(response, "http://localhost/api/blackbox")
      expected.verifyImages = formatedBlackBoxRequest.verifyImages


      expect(expected).to.eql(formatedBlackBoxRequest)
    })
})
