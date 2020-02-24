
export default function makeFormatBlackboxRequestVerification({enrollmentDb}) {
  return async function formatBlackboxRequestVerification(verifyInfo, replyUrl, svsURL) {

    try {
      let { person_id, organization_id } = verifyInfo.verification_data.verify_arr[0]
      let verifyUrls = verifyInfo.verification_data.urls

      const enrollDatas = await enrollmentDb.findAll(person_id, organization_id)

      let enrollData = []
      enrollDatas.map(item => {
        enrollData.push(item.dataValues)
      })

      let enrollUrls = []
      enrollData.map(item => {
        if (item.enrollmentStatus) {
          enrollUrls.push(item.url)
        }
      })

      let verifyImages = []

      enrollUrls.map((enrollUrl, i1) => {
        verifyUrls.map((verifyUrl, i2) => {
          let pairArray = []
          pairArray.push(svsURL + '/' + enrollUrl)
          pairArray.push(svsURL + '/' + verifyUrl)
          verifyImages.push(pairArray)
        })
      })

      let formatedReq = {
        jobType: 'VERIFY',
        jobId: verifyInfo.verificationInfo.jobId,
        userInfo_UID: verifyInfo.verificationInfo.userInfo_UID,
        userInfo_OID: verifyInfo.verificationInfo.userInfo_OID,
        replyUrl: replyUrl,
        verifyImages: verifyImages
      }

      return formatedReq

    } catch (e) {
      throw new Error(e)
    }
  }
}
