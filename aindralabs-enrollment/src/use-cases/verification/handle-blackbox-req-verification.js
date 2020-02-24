import request from 'request'
export default function makeHandleBlackboxReqVerification() {
    return async function handleBlackboxReqVerification({blackboxReqFormatResponse, url}) {
        try {
            const blackboxCall = new Promise(function (resolve, reject) {
                request.post({
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    url: url,
                    body: JSON.stringify({ ...blackboxReqFormatResponse }),
                }, function (error, resp, body) {
                    if (error) {
                        reject(error)
                    } else if (resp && resp.statusCode) {
                        const res = JSON.parse(body);
                        // console.log(res);
                        resolve(res);
                    }
                })
            })
            const res = await blackboxCall.then(function (res) {
                return res
            }, function (err) {
              throw new Error('something went wrong with blackbox')
            });
            return res
        } catch (error) {
            throw new Error('blackbox error')
            return error
        }

    }
}
