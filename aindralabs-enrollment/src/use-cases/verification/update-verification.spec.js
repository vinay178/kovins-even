import makeUpdateVerification from './update-verification'
import makeVerificationDb from '../../data-access/verification-db'

import makeFakeVerificationData from "../../../__test/fakeData/verificationData";

var expect = require("chai").expect;

const verificationImage = require("../../../__test/db/index").verificationImage;



describe('Update verification use cases', () => {
    let verificationDb;
    beforeEach(() => {
        verificationDb = makeVerificationDb({ verificationImage });
    })

    it("Update verification data ", async () => {
      const updateVerification = makeUpdateVerification({ verificationDb });
      const verificationToUpdate = makeFakeVerificationData({})

      console.log('verificationToUpdate', verificationToUpdate);
      const updateFakeVerificationData = {
        livelinessFailed: false,
        verificationStatus: true,
        urls: [
          {
            url: '/home/rafigaucho/projects/aindralabsVerification/images/1552184111_12.8974162_77.5831673_198000.jpg',
            bbox: {"y": "71", "x": "173", "w": "213", "h": "247"}
          },
          {
            url: '/home/rafigaucho/projects/aindralabsVerification/images/1552184111_12.8974162_77.5831673_198000.jpg',
            bbox: {"y": "71", "x": "173", "w": "213", "h": "247"}
          }
        ],
        person_id: verificationToUpdate.person_id,
        jobId: verificationToUpdate.jobId,
        organization_id: verificationToUpdate.organization_id
      }
      console.log('jolllllllbId',updateFakeVerificationData.jobId);

      const updatedVerification = await updateVerification({...updateFakeVerificationData})
      expect(updatedVerification.length).to.eql(2)   // two url is passed , so two field updated
    })
})
