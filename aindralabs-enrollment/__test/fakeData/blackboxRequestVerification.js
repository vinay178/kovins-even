import faker from 'faker'

export default function makeFakeBlackboxRequestVerification(overrides) {
    const fakeBlackboxRequestVerification = {
      jobType: "VERIFY",
      jobId: faker.random.uuid(),
      userInfo_OID: faker.random.uuid(),
      userInfo_UID: faker.random.uuid(),
      replyUrl: "http://localhost/api/blackbox",
      verifyImages: [
        [
            "/disk_new/blackbox_fv/Sample_Images_DS/Pradip_Maju_GA2143/Pradip_14.JPG",
            "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_5.JPG"
        ],
        [
            "/disk_new/blackbox_fv/Sample_Images_DS/Pradip_Maju_GA2143/Pradip_14.JPG",
            "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_18.JPG"
        ],
        [
            "/disk_new/blackbox_fv/Sample_Images_DS/Pradip_Maju_GA2143/Pradip_14.JPG",
            "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_12.JPG"
        ],
        [
            "/disk_new/blackbox_fv/Sample_Images_DS/Pradip_Maju_GA2143/Pradip_20.JPG",
            "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_5.JPG"
        ],
      ]
    }
    return {
        ...fakeBlackboxRequestVerification,
        ...overrides
    }
}
