const makePatchLicensePlan = ({ editLicensePlan, log, headers }) => {
   const patchLicensePlan = async httpRequest => {
      try {
         const licensePlanInfo = httpRequest.body
         const toEdit = {
            id: httpRequest.params.id,
            ...licensePlanInfo,
         }
         const patched = await editLicensePlan(toEdit)
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
   return patchLicensePlan
}

export default makePatchLicensePlan
