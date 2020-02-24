import makeAddVerification from './add-verification'
import makeVerificationDb from '../../data-access/verification-db'

import makeFakeVerificationData from "../../../__test/fakeData/verificationData";
import makeFakeVerificationRequest from "../../../__test/fakeData/verificationRequest";

var expect = require("chai").expect;

const verificationImage = require("../../../__test/db/index").verificationImage;



describe('Add verification use cases', () => {
    let verificationDb;
    let verificationRequest;
    beforeEach(() => {
        verificationDb = makeVerificationDb({ verificationImage });
        verificationRequest = makeFakeVerificationRequest({ jobType: 'VERIFY'})   //fake verification Request
    })

    it("Insert verification data into database", async () => {

        const addVerification = makeAddVerification({ verificationDb })

        const inserted = (await addVerification(verificationRequest)).verification_data.verify_arr[0];

        const newVerificationData = makeFakeVerificationData({
          url: inserted.url,
          timestamp: inserted.timestamp,
          person_id: inserted.person_id,
          jobId: inserted.jobId,
          organization_id: inserted.organization_id,
          latitude: inserted.latitude,
          longitude: inserted.longitude,
          timeZone: inserted.timeZone,
          firebaseDeviceIdentifier: inserted.firebaseDeviceIdentifier
          })

          inserted.verificationStatus = newVerificationData.verificationStatus;
          inserted.livelinessFailed = newVerificationData.livelinessFailed;
          inserted.x = newVerificationData.x;
          inserted.y = newVerificationData.y;
          inserted.w = newVerificationData.w;
          inserted.h = newVerificationData.h;

        expect(inserted).to.eql(newVerificationData)
    })
})
