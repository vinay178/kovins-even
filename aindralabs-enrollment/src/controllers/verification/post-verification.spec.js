import  makePostVerification  from './post-verification'
import makeVerificationDb from '../../data-access/verification-db'

import { auditUseCase } from '../../use-cases/audit'
import { addVerification, updateVerification, formatBlackboxRequestVerification, handleBlackboxReqVerification, getFirebaseIdVerification } from '../../use-cases/verification'
import  firebaseNotification  from '../../firebase'

import makeFakeVerificationData from "../../../__test/fakeData/verificationData";
import makeFakeVerificationRequest from "../../../__test/fakeData/verificationRequest";
import makeFakeBlackboxRequestVerification from "../../../__test/fakeData/blackboxRequestVerification";

var expect = require("chai").expect;
const faker = require('faker');
const verificationImage = require("../../../__test/db/index").verificationImage;



describe('Post Verification Controller', () => {
  const postVerification = makePostVerification({
    addVerification,
    formatBlackboxRequestVerification,
    handleBlackboxReqVerification,
    auditUseCase,
    firebaseNotification
  })

    it("Successfully handled an verification", async () => {

      let verificationRequest = makeFakeVerificationRequest({jobType: 'VERIFY'})

      const actual = {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: {
          apiSuccessStatus: true,
          apiErrMessage: '',
          firebaseDeviceIdentifier: verificationRequest.firebaseDeviceIdentifier
        }
      }

      const httpRequest = {
        body: verificationRequest,
        correlationId: faker.random.uuid(),
        files: verificationRequest.files
      }
      const expected = await postVerification(httpRequest)

      expect(actual).to.eql(expected)
    })

    it("Successfully handle re-verification", async () => {

      let verificationRequest1 = makeFakeVerificationRequest({jobType: 'VERIFY'})
      const httpRequest1 = {
        body: verificationRequest1,
        correlationId: faker.random.uuid(),
        files: verificationRequest1.files
      }
      await postVerification(httpRequest1)


      let verificationRequest2 = makeFakeVerificationRequest({
        jobType: 'enroll',
        userInfo_UID:verificationRequest1.userInfo_UID,
        userInfo_OID:verificationRequest1.userInfo_OID,
        firebaseDeviceIdentifier: verificationRequest1.firebaseDeviceIdentifier
      })
      const httpRequest = {
        body: verificationRequest2,
        correlationId: faker.random.uuid(),
        files: verificationRequest2.files
      }
      const expected = await postVerification(httpRequest)


      const actual = {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: {
          apiSuccessStatus: true,
          apiErrMessage: '',
          firebaseDeviceIdentifier: verificationRequest2.firebaseDeviceIdentifier
        }
      }


      const getAll = new Promise((resolve,reject) => {
         verificationImage.findAll({
          where: {
            person_id: verificationRequest2.userInfo_UID,
            organization_id: verificationRequest2.userInfo_OID,
          }
        }).then(list => {
          resolve(list);
        }  ).catch(e => e)
      })

      const total_urls_in_db = await getAll
      expect(total_urls_in_db.length).to.eql(5)
    })
})
