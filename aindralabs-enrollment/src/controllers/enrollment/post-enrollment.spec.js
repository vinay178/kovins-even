import makePostEnrollment from './post-enrollment'
import makeEnrollmentDb from '../../data-access/enrollment-db'

import { auditUseCase } from '../../use-cases/audit'
import { addEnrollment, updateEnrollment, formatBlackboxRequest, handleBlackboxReq, getFirebaseId  } from '../../use-cases/enrollment'

import makeFakeEnrollData from "../../../__test/fakeData/enrollData";
import makeFakeEnrollmentRequest from "../../../__test/fakeData/enrollmentRequest";
import makeFakeBlackboxRequest from "../../../__test/fakeData/blackboxRequest";

var expect = require("chai").expect;
const faker = require('faker');
const enrollment = require("../../../__test/db/index").enrollment;



describe('Post Enrollment Controller', () => {
  let postEnrollment = makePostEnrollment({
    addEnrollment,
    handleBlackboxReq,
    formatBlackboxRequest,
    auditUseCase
  })


    it("Successfully handled an enrollment", async () => {

      let fakeEnrollmentRequest = makeFakeEnrollmentRequest({jobType: 'ENROLL'})

      const actual = {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: {
          apiSuccessStatus: true,
          apiErrMessage: '',
          firebaseDeviceIdentifier: fakeEnrollmentRequest.firebaseDeviceIdentifier
        }
      }

      const httpRequest = {
        body: fakeEnrollmentRequest,
        correlationId: faker.random.uuid(),
        files: fakeEnrollmentRequest.files
      }
      const expected = await postEnrollment(httpRequest)

      expect(actual).to.eql(expected)
    })

    it("Successfully handle re-enrollment", async () => {

      let fakeEnrollmentRequest1 = makeFakeEnrollmentRequest({jobType: 'ENROLL'})
      const httpRequest1 = {
        body: fakeEnrollmentRequest1,
        correlationId: faker.random.uuid(),
        files: fakeEnrollmentRequest1.files
      }
      await postEnrollment(httpRequest1)


      let fakeEnrollmentRequest2 = makeFakeEnrollmentRequest({
        jobType: 'enroll',
        userInfo_UID:fakeEnrollmentRequest1.userInfo_UID,
        userInfo_OID:fakeEnrollmentRequest1.userInfo_OID,
        firebaseDeviceIdentifier: fakeEnrollmentRequest1.firebaseDeviceIdentifier
      })
      const httpRequest = {
        body: fakeEnrollmentRequest2,
        correlationId: faker.random.uuid(),
        files: fakeEnrollmentRequest2.files
      }
      const expected = await postEnrollment(httpRequest)


      const actual = {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: {
          apiSuccessStatus: true,
          apiErrMessage: '',
          firebaseDeviceIdentifier: fakeEnrollmentRequest2.firebaseDeviceIdentifier
        }
      }


      const getAll = new Promise((resolve,reject) => {
         enrollment.findAll({
          where: {
            person_id: fakeEnrollmentRequest2.userInfo_UID,
            organization_id: fakeEnrollmentRequest2.userInfo_OID,
          }
        }).then(list => {
          resolve(list);
        }  ).catch(e => e)
      })

      const total_urls_in_db = await getAll
      expect(total_urls_in_db.length).to.eql(5)
    })
})
