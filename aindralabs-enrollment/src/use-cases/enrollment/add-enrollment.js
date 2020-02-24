import makeEnrollment from '../../entities/enrollment'

export default function makeAddEnrollment ({ enrollmentDb }) {
  return async function addEnrollment (enrollmentInfo) {

    const enroll_data = makeEnrollment(enrollmentInfo);
    const enroll_data_arr = enroll_data.enroll_arr;
    const storeData = await enrollmentDb.insert(enroll_data_arr);

    return {enroll_data, enrollmentInfo}
  }
}
