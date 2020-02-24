import makeHandleBlackboxReq from './handle-blackbox-req'
import makeFakeBlackboxRequest from "../../../__test/fakeData/blackboxRequest";

const nock = require('nock')
const expect = require("chai").expect;


describe('Handle Blackbox Request Use Case', () => {
    let formatedBlackBoxRequest;
    let url;
    beforeEach(() => {
      formatedBlackBoxRequest = makeFakeBlackboxRequest()

      url = 'http://localhost:8003/api/blackbox'

      const fakeBlackboxServer = nock('http://localhost:8003')
      .post('/api/blackbox', formatedBlackBoxRequest )
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
