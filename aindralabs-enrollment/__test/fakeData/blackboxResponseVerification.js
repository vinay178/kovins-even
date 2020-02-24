import faker from 'faker'

export default function makeFakeBlackboxResponseVerification(overrides) {
    const fakeBlackboxRepsonseVerification = {
      userInfo_OID: faker.random.uuid(),
      userInfo_UID: faker.random.uuid(),
      jobId: faker.random.uuid(),
      "verificationStatus": "VERIFIED_DIFFERENT",
      "confidentiality": "0.752597205838",
      "livelinessFailed": false,
      "urls": {
          "bbox2": {
              "y": "71",
              "x": "173",
              "w": "213",
              "h": "247"
          },
          "bbox0": {
              "y": "144",
              "x": "171",
              "w": "199",
              "h": "228"
          },
          "bbox1": {
              "y": "187",
              "x": "107",
              "w": "204",
              "h": "224"
          },
          "url1": "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_18.JPG",
          "url0": "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_12.JPG",
          "url2": "/disk_new/blackbox_fv/Sample_Images_DS/Gobind_JA19111/Gobind_5.JPG"
      },
      "errorMessage": "None",
    }
    return {
        ...fakeBlackboxRepsonseVerification,
        ...overrides
    }
}
