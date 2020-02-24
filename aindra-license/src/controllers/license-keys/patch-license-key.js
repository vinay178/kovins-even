const makePatchLicenseKey = ({ editLicenseKey, log, headers }) => {
   const patchLicenseKey = async httpRequest => {
      try {
         const licenseKeyInfo = httpRequest.body
         const toEdit = {
            id: httpRequest.params.id,
            ...licenseKeyInfo,
         }
         const patched = await editLicenseKey(toEdit)
         return {
            headers,
            statusCode: 201,
            body: { success: true, data: patched },
         }
      } catch (error) {
         console.log({ corelationId: httpRequest.corelationId, error })
         log.error({ corelationId: httpRequest.corelationId, error: error.message })
         let statusCode = 500
         if (error.name === 'Error') statusCode = 400
         if (error.name === 'RangeError') statusCode = 404
         return {
            headers: {
               'Content-Type': 'application/json',
            },
            statusCode,
            body: {
               success: false,
               error: error.message,
            },
         }
      }
   }
   return patchLicenseKey
}

export default makePatchLicenseKey
