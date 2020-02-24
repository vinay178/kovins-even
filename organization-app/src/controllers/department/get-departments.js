export default function makeGetDepartments({ listDepartments, log, headers }) {
   return async function getDepartments(httpRequest) {
      try {
         const departments = await listDepartments({ id: httpRequest.params.id })
         return {
            headers,
            statusCode: 200,
            body: { success: true, data: departments },
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
}
