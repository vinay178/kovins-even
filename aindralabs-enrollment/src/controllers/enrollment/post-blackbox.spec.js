import makePostBlackbox from './post-blackbox';

import { auditUseCase } from '../../use-cases/audit'
import { addEnrollment, updateEnrollment, formatBlackboxRequest, handleBlackboxReq, getFirebaseId  } from '../../use-cases/enrollment'
import  firebaseNotification  from '../../firebase'

import makeFakeBlackboxResponse from "../../../__test/fakeData/blackboxResponse";
import makeFakeEnrollData from "../../../__test/fakeData/enrollmentRequest";

var expect = require("chai").expect;
const faker = require('faker');



describe('Post Blackbox Controller', () => {

    it("Successfully updated database and sent notification to client", async () => {
      const fakeEnrollment =  makeFakeEnrollData()
      await addEnrollment(fakeEnrollment)

      const fakeBlackboxRepsonse = makeFakeBlackboxResponse({enrollmentStatus: true, userInfo_OID: fakeEnrollment.userInfo_OID, userInfo_UID: fakeEnrollment.userInfo_UID, errorMessage: "nnn" })
      const postBlackbox = makePostBlackbox({
        updateEnrollment,
        firebaseNotification,
        auditUseCase,
        getFirebaseId
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
          enrollmentStatus: true
        }
      }

      const expected = await postBlackbox(httpRequest)
      actual.headers['Last-Modified'] =  expected.headers['Last-Modified']
      expect(expected).to.eql(actual)

    })

    it("Successfully handle Enrollment Failure", async () => {
      const fakeEnrollment =  makeFakeEnrollData()

      await addEnrollment(fakeEnrollment)

      const fakeBlackboxRepsonse = makeFakeBlackboxResponse({userInfo_OID: fakeEnrollment.userInfo_OID, userInfo_UID: fakeEnrollment.userInfo_UID })
      const postBlackbox = makePostBlackbox({
        updateEnrollment,
        firebaseNotification,
        auditUseCase,
        getFirebaseId
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
          enrollmentStatus: false
        }
      }

      const expected = await postBlackbox(httpRequest)
      actual.headers['Last-Modified'] =  expected.headers['Last-Modified']
      expect(expected).to.eql(actual)

    })
})
