import makePostBlackbox  from './post-verification-blackbox'

import { auditUseCase } from '../../use-cases/audit'
import { addVerification, updateVerification, formatBlackboxRequestVerification, handleBlackboxReqVerification, getFirebaseIdVerification } from '../../use-cases/verification'
import  firebaseNotification  from '../../firebase'

import makeFakeBlackboxResponseVerification from "../../../__test/fakeData/blackboxResponseVerification";
import makeFakeVerificationRequest from "../../../__test/fakeData/verificationRequest";

var expect = require("chai").expect;
const faker = require('faker');



describe('Post Blackbox Controller', () => {

    it("Successfully updated database and sent notification to client", async () => {
      const fakeVerification =  makeFakeVerificationRequest()
      await addVerification(fakeVerification)

      const fakeBlackboxRepsonse = makeFakeBlackboxResponseVerification({verificationStatus: 'VERIFIED SAME', userInfo_OID: fakeVerification.userInfo_OID, userInfo_UID: fakeVerification.userInfo_UID })
      const postBlackbox = makePostBlackbox({
        updateVerification,
        auditUseCase,
        getFirebaseIdVerification,
        firebaseNotification
       });

      const httpRequest = {
        body: fakeBlackboxRepsonse,
        correlationId: faker.random.uuid()
      }

      const actual = {
        headers:{
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 200,
        body: {
          verificationStatus: 'VERIFIED SAME'
        }
      }

      const expected = await postBlackbox(httpRequest)
      actual.headers['Last-Modified'] =  expected.headers['Last-Modified']
      expect(expected).to.eql(actual)

    })

    it("Successfully handle verification Failure", async () => {
      const fakeVerification =  makeFakeVerificationRequest()

      await addVerification(fakeVerification)

      const fakeBlackboxRepsonse = makeFakeBlackboxResponseVerification({userInfo_OID: fakeVerification.userInfo_OID, userInfo_UID: fakeVerification.userInfo_UID, verificationStatus: 'VERIFIED FAILED' })
      const postBlackbox = makePostBlackbox({
        updateVerification,
        auditUseCase,
        getFirebaseIdVerification,
        firebaseNotification
       });
      const httpRequest = {
        body: fakeBlackboxRepsonse,
        correlationId: faker.random.uuid()
      }

      const actual = {
        headers:{
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: {
          verificationStatus: 'VERIFIED FAILED'
        }
      }

      const expected = await postBlackbox(httpRequest)
      actual.headers['Last-Modified'] =  expected.headers['Last-Modified']

      expect(expected).to.eql(actual)

    })
})
