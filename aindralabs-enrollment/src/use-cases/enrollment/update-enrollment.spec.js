import makeUpdateEnrollment from './update-enrollment'
import makeEnrollmentDb from '../../data-access/enrollment-db'

import makeFakeEnrollData from "../../../__test/fakeData/enrollData";
import makeFakeEnrollmentRequest from "../../../__test/fakeData/enrollmentRequest";

var expect = require("chai").expect;

const enrollment = require("../../../__test/db/index").enrollment;



describe('Update enrollment use cases', () => {
    let enrollmentDb;
    beforeEach(() => {
        enrollmentDb = makeEnrollmentDb({ enrollment });
    })

    it("Update enroll data ", async () => {

      const updateEnrollment = makeUpdateEnrollment({ enrollmentDb });
      const enrollmentToUpdate = makeFakeEnrollData({})


      const updateFakeEnrollData = {
        successUrls: { url1 : enrollmentToUpdate.url },
        person_id: enrollmentToUpdate.person_id,
        organization_id: enrollmentToUpdate.organization_id
      }


      const updatedEnrollment = (await updateEnrollment({...updateFakeEnrollData}))[0]
      updatedEnrollment.timestamp = enrollmentToUpdate.timestamp

      enrollmentToUpdate.enrollmentStatus =updatedEnrollment.enrollmentStatus
      enrollmentToUpdate.livelinessFailed =updatedEnrollment.livelinessFailed
      updatedEnrollment.latitude = enrollmentToUpdate.latitude
      updatedEnrollment.longitude = enrollmentToUpdate.longitude
      updatedEnrollment.timeZone = enrollmentToUpdate.timeZone
      updatedEnrollment.firebaseDeviceIdentifier = enrollmentToUpdate.firebaseDeviceIdentifier

      expect(updatedEnrollment).to.eql(enrollmentToUpdate)
    })
})
