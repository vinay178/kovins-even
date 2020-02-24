import makeHandleBlackboxReq from './handle-blackbox-req-verification'
import makeFakeBlackboxRequestVerification from "../../../__test/fakeData/blackboxRequestVerification";

const nock = require('nock')
const expect = require("chai").expect;


describe('Handle Blackbox Request Use Case', () => {
    let formatedBlackBoxRequest;
    let url;
    beforeEach(() => {
      formatedBlackBoxRequest = makeFakeBlackboxRequestVerification()

      url = 'http://localhost:8003/api/verificationBlackbox'

      const fakeBlackboxServer = nock('http://localhost:8003')
      .post('/api/verificationBlackbox', formatedBlackBoxRequest )
      .reply(200, { apiSuccessStatus: true, apiErrMessage: ''  })

    })

    it("Successfull call for blackbox call", async () => {
      const handleBlackboxReq = makeHandleBlackboxReq()


      const expected = {
        apiSuccessStatus: true,
        apiErrMessage: '',
      }

      let response = formatedBlackBoxRequest

      const actual = await handleBlackboxReq({blackboxReqFormatResponse:response, url})

      expect(expected).to.eql(actual)
    })
})
