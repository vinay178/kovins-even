export default function makeAuditDb({ audit, Op }) {
    return Object.freeze({
      insertTo,
      update,
      findAll
    })
    async function insertTo(enroll_data_arr) {
      const inserData = new Promise((resolve, reject) => {
        audit.create(enroll_data_arr)
        .then(audit_data => {
          resolve(audit_data)
        })
        .catch(function (err) {
          console.log('err', err);
          reject(err)
        })
      })
      const resp = await inserData.then(function (res) {
        return res
      }, function (err) {
        console.error(err);
        throw err
        return err
      });

      return resp

    }

    async function update(auditInfoUpdated) {
      const updateData = new Promise((resolve, reject) => {
        audit.update({status: auditInfoUpdated.status, data:auditInfoUpdated.data}, { where: {correlationId: auditInfoUpdated.correlationId}})
        .then(res => {
          resolve(res)
        })
        .catch(function (err) {
          console.log('err', err);
          reject(err)
        })

      })

      const resp = await updateData.then(function (res) {
        return res
      }, function (err) {
        console.error(err);
        return err
      });

      return resp
    }

    async function findAll() {
      const getData = new Promise((resolve, reject) => {
        audit.findAll({
          where: {
            [Op.or]: [
              {
                status:  'POST_ENROLLMENT_TO_DB',
              },
              {
                status:  'FORMAT_REQ_FOR_BLACKBOX',
              },
              {
                status:  'UPDATE_ENROLLMENT_DB',
              },
              {
                status:  'POST_VERIFICATION_TO_DB',
              },
              {
                status:  'FORMAT_REQ_FOR_BLACKBOX_VERIFICATION',
              },
              {
                status:  'UPDATE_VERIFICATION_DB',
              }
            ]
          }
        }).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error);
        })
      })

      const res = await getData.then(function (res) {
        return res;
      }, function (error) {
        throw new ReferenceError(error);
      })

      return res;
    }

}
