module.exports = function makeExpressCallback(controller) {
    return (req, res) => {
        const httpRequest = {
            uid: req.uid,
            rid: req.rid,
            did: req.did,
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            corelationId: req.headers['corelation_id'],
            jwt: req.body.token || req.query.token || req.headers['x-access-token'],
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent'),
                authorization: req.get('authorization')
            },
        }

        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type('json')
                if (httpResponse.statusCode === 500)
                    return res.status(httpResponse.statusCode).send({
                        status: false,
                        message: 'Something went wrong we are sending expert monkeys to deal with this situation',
                    })

                return res.status(httpResponse.statusCode).send(httpResponse.body)
            })
            .catch(e => {
                console.log(e)
                res.status(500).send({ error: 'An unkown error occurred.' })
            })
    }
}