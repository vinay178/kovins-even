export default function makeGetFirebaseId ({ enrollmentDb }) {
  return async function getFirebaseId (data) {
    const firebaseDeviceIdentifier = await enrollmentDb.getFirebaseId(data);

    return firebaseDeviceIdentifier
  }
}
