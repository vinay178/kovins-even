export default function extractDataFromFileName(filename) {
  let enroll_data = {};

  try {

    const currentFilename = filename.split('_', 4);
    enroll_data['timestamp'] = currentFilename[0]
    enroll_data['latitude'] = currentFilename[1]
    enroll_data['longitude'] = currentFilename[2]

    if (!currentFilename[3]) {
      throw new Error('the filename is not formatted correctly')
    }
    let timeZone = currentFilename[3].replace(".jpg", "").replace(".png", "").replace( ".jpeg" , "")
    enroll_data['timeZone'] = timeZone

    let checkDate = new Date(Number(enroll_data['timestamp'] * 1000)).toString()
    if (checkDate === 'Invalid Date' || !currentFilename[1] || !currentFilename[2] || !timeZone ) {
      throw new Error('the filename is not formatted correctly')
    }

  } catch (e) {
    throw e
  }
  return enroll_data;
}
