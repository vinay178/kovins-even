export default function makeUpdateEnrollment ({ enrollmentDb }) {
  return async function updateEnrollment (updated_enrollmentInfo) {

    const enroll_data = await enrollmentDb.update({...updated_enrollmentInfo});

    return enroll_data
  }
}
