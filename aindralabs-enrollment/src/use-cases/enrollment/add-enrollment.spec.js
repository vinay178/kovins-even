import makeAddEnrollment from './add-enrollment'
import makeEnrollmentDb from '../../data-access/enrollment-db'

import makeFakeEnrollData from "../../../__test/fakeData/enrollData";
import makeFakeEnrollmentRequest from "../../../__test/fakeData/enrollmentRequest";

var expect = require("chai").expect;

const enrollment = require("../../../__test/db/index").enrollment;



describe('Add enrollment use cases', () => {
    let enrollmentDb;
    let enrollmentRequest;
    beforeEach(() => {
        enrollmentDb = makeEnrollmentDb({ enrollment });
        enrollmentRequest = makeFakeEnrollmentRequest({ jobType: 'ENROLL'})   //fake enrollment Request
    })

    it("Insert enroll data into database", async () => {

        const addEnrollment = makeAddEnrollment({ enrollmentDb })

        const inserted = (await addEnrollment(enrollmentRequest)).enroll_data.enroll_arr[0];

        const newEnrollData = makeFakeEnrollData({
          url: inserted.url,
          timestamp: inserted.timestamp,
          jobId: inserted.jobId,
          person_id: inserted.person_id,
          organization_id: inserted.organization_id,
          latitude: inserted.latitude,
          longitude: inserted.longitude,
          timeZone: inserted.timeZone,
          firebaseDeviceIdentifier: inserted.firebaseDeviceIdentifier
          })

        inserted.enrollmentStatus = newEnrollData.enrollmentStatus;

        expect(inserted).to.eql(newEnrollData)
    })
})
