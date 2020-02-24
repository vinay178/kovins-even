import makeFakeVerificationRequest from "../../../__test/fakeData/verificationRequest";
import makeVerification from './';

var expect = require("chai").expect;

describe("verification Entities", () => {

    it('firebaseDeviceIdentifier must have a value ', () => {
        const verification = makeFakeVerificationRequest({ firebaseDeviceIdentifier: null });
        expect(() => makeVerification(verification)).to.throw("firebaseDeviceIdentifier missing");
    })

    it('must not throw firebaseDeviceIdentifier ', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("firebaseDeviceIdentifier missing");
    })

    it('jobType must have a value ', () => {
        const verification = makeFakeVerificationRequest({ jobType: null });
        expect(() => makeVerification(verification)).to.throw("jobType must be VERIFY");
    })

    it('jobType must have value VERIFY', () => {
        const verification = makeFakeVerificationRequest({ jobType: 'enroll' });
        expect(() => makeVerification(verification)).to.throw("jobType must be VERIFY");
    })

    it('must not throw jobType error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("jobType must be VERIFY");
    })

    it('must have userInfo_OID ', () => {
        const verification = makeFakeVerificationRequest({  userInfo_OID: null });
        expect(() => makeVerification(verification)).to.throw("verifying user must have a userInfo_OID.");
    })

    it('must not throw userInfo_OID error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("verifying user must have a userInfo_OID.");
    })

    it('must have userInfo_UID ', () => {
        const verification = makeFakeVerificationRequest({ userInfo_UID: null });
        expect(() => makeVerification(verification)).to.throw("verifying user must have a userInfo_UID.");
    })


    it('must not throw userInfo_UID error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("verifying user must have a userInfo_UID.");
    })


    it('must have jobId ', () => {
        const verification = makeFakeVerificationRequest({ jobId: null });
        expect(() => makeVerification(verification)).to.throw("job ID missing");
    })

    it('must not throw jobId error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("job ID missing");
    })

    it('must have date ', () => {
        const verification = makeFakeVerificationRequest({ date: null });
        expect(() => makeVerification(verification)).to.throw("date is invalid!");
    })

    it('date value must be a date ', () => {
        const verification = makeFakeVerificationRequest({ date: 'kl' });
        expect(() => makeVerification(verification)).to.throw("date is invalid!");
    })

    it('must not throw date error ', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("date is invalid!");
    })

    it('must have positive value for sessionType ', () => {
        const verification = makeFakeVerificationRequest({ sessionType: -1 });
        expect(() => makeVerification(verification)).to.throw("sessionType must be between 1 to n");
    })

    it('must have number value for sessionType ', () => {
        const verification = makeFakeVerificationRequest({ sessionType: 'apple' });
        expect(() => makeVerification(verification)).to.throw("sessionType must be between 1 to n");
    })


    it('must not throw sessionType error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("sessionType must be between 1 to n");
    })

    it('must have files ', () => {
        const verification = makeFakeVerificationRequest({ files: null });
        expect(() => makeVerification(verification)).to.throw("verify must have files");
    })

    it('must have 3 files ', () => {
        const verification = makeFakeVerificationRequest({ files: ['testName'] });
        expect(() => makeVerification(verification)).to.throw("verifying user must upload atleast 3 files");
    })

    it('must not throw files error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("verifying user must upload atleast 3 files");
    })

    it('must have filenames ', () => {
        const verification = makeFakeVerificationRequest({ filenames: null });
        expect(() => makeVerification(verification)).to.throw("verify must contain filenames.");
    })

    it('must have 3 filenames ', () => {
        const verification = makeFakeVerificationRequest({ filenames: ['testName'] });
        expect(() => makeVerification(verification)).to.throw("verifying user must upload atleast 3 filesnames");
    })

    it('filenames is not formatted correctly ', () => {
        const verification = makeFakeVerificationRequest({ files: [
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'},
          { path: 'images/invalidName.jpg' , originalname: 'invalidName.jpg'}
        ] });
        expect(() => makeVerification(verification)).to.throw("the filename is not formatted correctly");
    })

    it('must not throw filenames error', () => {
        const verification = makeFakeVerificationRequest();
        expect(() => makeVerification(verification)).to.not.throw("verifying user must upload atleast 3 filesnames");
    })

});
