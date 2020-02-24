export default function makeEnrollmentDb({ enrollment }) {
  return Object.freeze({
    findAll,
    insert,
    update,
    getFirebaseId
  })

  async function findAll(person_id, organization_id) {

    try {
      const res = await enrollment.findAll({
        where: {
          person_id: person_id,
          organization_id: organization_id
        }
      })

      return res;
    } catch (e) {
      throw new Error(`database error! ${e}`)
    }
  }

  async function insert(enroll_data_arr) {
    try {
      const isDataExist = await enrollment.findAll({
        where: {
          person_id: enroll_data_arr[0].person_id,
          organization_id: enroll_data_arr[0].organization_id                }
        })

      if (isDataExist.length != 0) {
        const deleted = await enrollment.destroy({
          where: {
            person_id: enroll_data_arr[0].person_id,
            organization_id: enroll_data_arr[0].organization_id,
          }
        })
      }

      const resp = await enrollment.bulkCreate(enroll_data_arr)

      return resp

    } catch (e) {
      console.log('database error!',e);
      throw new Error('database error!')
    }


  }

  async function update(data) {
    let flag = 0
    const updateEnrolledData = new Promise((res, rej) => {
      const promises = [];
      let updatingUrls = Object.values(data.successUrls)
      if (data.livelinessFailed === 'true' || data.livelinessFailed === true) {
        updatingUrls = [...data.successUrls , ...data.failedUrls ]
      }
      else if( updatingUrls && updatingUrls.length === 0) {
        throw new Error('empty successUrls')
      }
      let enrollmentStatus = false
      if (data.enrollmentStatus === 'true' || data.enrollmentStatus === true) {
        enrollmentStatus = true
      }
      for (const url of updatingUrls) {
        let relativeUrl = 'images' + url.split('images')[1]

        const query1 = {}; const query2 = {}; const query3 = {};
        query1['url'] = relativeUrl; query2['person_id'] = data.person_id; query3['organization_id'] = data.organization_id;
        let updated_data = {};
        if (data.livelinessFailed === 'true' || data.livelinessFailed === true) {
          updated_data['livelinessFailed'] = true
          updated_data['enrollmentStatus'] = enrollmentStatus
        }
        else {
          updated_data['enrollmentStatus'] = enrollmentStatus
          updated_data['livelinessFailed'] = false
        }

        promises.push(new Promise(async (resolve, reject) => {
          enrollment.update(updated_data, { where: query1,query2,query3})
            .then(enroll_user_data => {
              let res = {
                url: relativeUrl,
                person_id: data.person_id,
                organization_id: data.organization_id,
                enrollmentStatus: enrollmentStatus,
                livelinessFailed: data.livelinessFailed
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
          }
        )
      }
    })

    const resp = await updateEnrolledData.then(function (res) {
      return res
    }, function (err) {
      console.error(err);
      throw new Error(err)
      return err
    });
    return resp

  }

  async function getFirebaseId(data) {
    const getId = new Promise((resolve,reject) => {
      enrollment.findAll({
        where: {
          person_id: data.person_id,
          organization_id: data.organization_id
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
        throw e
        reject(e)
      })
    });

      let firebaseId = await getId
      return firebaseId;

  }
}
