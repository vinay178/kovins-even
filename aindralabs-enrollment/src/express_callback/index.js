
module.exports = function makeExpressCallback(controller) {
  return (req, res) => {

    let fileArray = []
    if (req.files) {
    let files = Object.values(req.files)
      files.map(item => {
        fileArray.push(item[0])
      })
    }

    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      correlationId: req.id,
      files: fileArray,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
      }
    }

    controller(httpRequest)
    .then(httpResponse => {
      if (httpResponse.headers) {
        res.set(httpResponse.headers)
      }
      res.type('json')
      res.status(httpResponse.statusCode).send(httpResponse.body)
    })
    .catch(e => {
      console.log(e)
      res.status(500).send({ error: e.message })
    })
  }
}
