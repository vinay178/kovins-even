const makeGetLicensePlans = ({ listLicensePlans, log, headers }) => {
   const getLicensePlans = async httpRequest => {
      try {
         const licensePlans = await listLicensePlans({})
         return {
            headers,
            statusCode: 200,
            body: { success: true, data: licensePlans },
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
   return getLicensePlans
}

export default makeGetLicensePlans
