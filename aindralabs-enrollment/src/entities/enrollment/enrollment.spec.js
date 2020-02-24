import makeFakeEnrollmentRequest from "../../../__test/fakeData/enrollmentRequest";
import makeEnrolment from './';
var expect = require("chai").expect;

describe("Enrollment Entities", () => {

    it('firebaseDeviceIdentifier must have a value ', () => {
        const enrollment = makeFakeEnrollmentRequest({ firebaseDeviceIdentifier: null });
        expect(() => makeEnrolment(enrollment)).to.throw("firebaseDeviceIdentifier missing");
    })

    it('must not throw firebaseDeviceIdentifier ', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("firebaseDeviceIdentifier missing");
    })

    it('jobType must have a value ', () => {
        const enrollment = makeFakeEnrollmentRequest({ jobType: null });
        expect(() => makeEnrolment(enrollment)).to.throw("jobType must be ENROLL");
    })

    it('jobType must have value ENROLL', () => {
        const enrollment = makeFakeEnrollmentRequest({ jobType: 'verify' });
        expect(() => makeEnrolment(enrollment)).to.throw("jobType must be ENROLL");
    })

    it('must not throw jobType error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("jobType must be ENROLL");
    })

    it('must have userInfo_OID ', () => {
        const enrollment = makeFakeEnrollmentRequest({  userInfo_OID: null });
        expect(() => makeEnrolment(enrollment)).to.throw("enrolling user must have a userInfo_OID.");
    })

    it('must not throw userInfo_OID error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("enrolling user must have a userInfo_OID.");
    })

    it('must have userInfo_UID ', () => {
        const enrollment = makeFakeEnrollmentRequest({ userInfo_UID: null });
        expect(() => makeEnrolment(enrollment)).to.throw("enrolling user must have a userInfo_UID.");
    })


    it('must not throw userInfo_UID error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("enrolling user must have a userInfo_UID.");
    })


    it('must have jobId ', () => {
        const enrollment = makeFakeEnrollmentRequest({ jobId: null });
        expect(() => makeEnrolment(enrollment)).to.throw("job ID missing");
    })

    it('must not throw jobId error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("job ID missing");
    })

    it('must have retryCount ', () => {
        const enrollment = makeFakeEnrollmentRequest({ retryCount: null });
        expect(() => makeEnrolment(enrollment)).to.throw("retry count missing");
    })

    it('must have positive value for retryCount ', () => {
        const enrollment = makeFakeEnrollmentRequest({ retryCount: -1 });
        expect(() => makeEnrolment(enrollment)).to.throw("retry count must be positive integer");
    })

    it('must have number value for retryCount ', () => {
        const enrollment = makeFakeEnrollmentRequest({ retryCount: 'apple' });
        expect(() => makeEnrolment(enrollment)).to.throw("retry count must be positive integer");
    })

    it('must have retryCount value lessthan maxRetryCount Value ', () => {
        const enrollment = makeFakeEnrollmentRequest({ retryCount: 10 });
        expect(() => makeEnrolment(enrollment)).to.throw("Maximum Retry count reached . Please Contact Administrator");
    })

    it('must not throw retryCount error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("retry count must be positive integer");
    })

    it('must have files ', () => {
        const enrollment = makeFakeEnrollmentRequest({ files: null });
        expect(() => makeEnrolment(enrollment)).to.throw("enroll must have files");
    })

    it('must have 5 files ', () => {
        const enrollment = makeFakeEnrollmentRequest({ files: ['testName'] });
        expect(() => makeEnrolment(enrollment)).to.throw("enrolling user must upload atleast 5 files");
    })

    it('must not throw files error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("enrolling user must upload atleast 5 files");
    })

    it('must have filenames ', () => {
        const enrollment = makeFakeEnrollmentRequest({ filenames: null });
        expect(() => makeEnrolment(enrollment)).to.throw("enroll must contain filenames.");
    })

    it('must have 5 filenames ', () => {
        const enrollment = makeFakeEnrollmentRequest({ filenames: ['testName'] });
        expect(() => makeEnrolment(enrollment)).to.throw("enrolling user must upload atleast 5 filesnames");
    })

    it('filenames is not formatted correctly ', () => {
        const enrollment = makeFakeEnrollmentRequest({ files: [
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
        ] });
        expect(() => makeEnrolment(enrollment)).to.throw("the filename is not formatted correctly");
    })

    it('must not throw filenames error', () => {
        const enrollment = makeFakeEnrollmentRequest();
        expect(() => makeEnrolment(enrollment)).to.not.throw("enrolling user must upload atleast 5 filesnames");
    })

});
