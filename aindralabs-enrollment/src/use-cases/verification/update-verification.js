export default function makeUpdateVerification ({ verificationDb }) {
  return async function updateVerification (updated_verificationInfo) {

    const verify_data = await verificationDb.update({...updated_verificationInfo});

    return verify_data
  }
}
