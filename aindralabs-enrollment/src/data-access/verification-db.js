export default function makeVerificationDb({ verificationImage }) {
    return Object.freeze({
      insert,
      update,
      getFirebaseId
    })
    async function insert(verify_data_arr) {
      try {
        const isDataExist = await verificationImage.findAll({
          where: {
            person_id: verify_data_arr[0].person_id,
            organization_id: verify_data_arr[0].organization_id,
            jobId: verify_data_arr[0].jobId
          }
        })

        if (isDataExist.length != 0) {
          throw new Error('jobId already exist . jobId must be unique')
        }

        const resp = await verificationImage.bulkCreate(verify_data_arr)

        return resp

      } catch (e) {
        throw new Error(`database error! ${e}`)
      }
    }

    async function update(data) {
      let flag = 0
      const updateVerificationData = new Promise((res, rej) => {
        const promises = [];
        const items = data.urls
        if (items.length === 0) {
          throw new Error ("no mathcing urls in database");
        }
        for (const item of items) {
          let relativeUrl = 'images' + item.url.split('images')[1]
          const updated_data = {};
          updated_data['livelinessFailed'] = data.livelinessFailed
          updated_data['verificationStatus'] = data.verificationStatus
          updated_data['confidentiality'] = data.confidentiality
          updated_data['x'] = item.bbox.x
          updated_data['y'] = item.bbox.y
          updated_data['w'] = item.bbox.w
          updated_data['h'] = item.bbox.h

          promises.push(new Promise(async (resolve, reject) => {
            verificationImage.update(updated_data, { where: {
              person_id: data.person_id,
              organization_id: data.organization_id,
              jobId: data.jobId,
              url: relativeUrl
            }})
            .then(enroll_user_data => {
              let res = {
                url: relativeUrl,
                person_id: data.person_id,
                organization_id: data.organization_id,
                jobId: data.jobId,
                livelinessFailed: data.livelinessFailed,
                verificationStatus: data.verificationStatus
              }
                resolve(res)
            })
            .catch(function (err) {
              console.log('err', err);
              reject(err)
            })
          }))

          Promise.all(promises).then((resp) => {
            flag = flag + 1 ;
            if (flag === promises.length) {
              res(resp);
            }
          })
          .catch((err) => {
            rej(err);
          })
        }

      }
    )

      const resp = await updateVerificationData.then(function (res) {
        return res
      }, function (err) {
        throw Error(err)
      });
      return resp
    }

    async function getFirebaseId(data) {
      const getId = new Promise((resolve,reject) => {
        verificationImage.findAll({
          where: {
            person_id: data.person_id,
            organization_id: data.organization_id,
            jobId: data.jobId
          }
        })
        .then(result => {
          if (result.length != 0) {
            resolve(result[0].dataValues.firebaseDeviceIdentifier)
          }
          else {
            resolve(result)
          }
        })
        .catch(e => {
          throw new Error(`database error: ${e}`)
          reject(e)
        })
      });

        let firebaseId = await getId
        return firebaseId;

    }
}
