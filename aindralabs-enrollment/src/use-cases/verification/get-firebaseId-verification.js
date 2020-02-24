export default function makeGetFirebaseIdVerification ({ verificationDb }) {
  return async function getFirebaseIdVerification (data) {
    const firebaseDeviceIdentifier = await verificationDb.getFirebaseId(data);

    return firebaseDeviceIdentifier
  }
}
