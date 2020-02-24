import makeVerification from '../../entities/verification'

export default function makeAddVerification ({ verificationDb }) {
  return async function addVerification (verificationInfo) {

    const verification_data = makeVerification(verificationInfo);
    const verify_data_arr = verification_data.verify_arr;

    const storeData = await verificationDb.insert(verify_data_arr);


    return {verification_data, verificationInfo}

  }
}
