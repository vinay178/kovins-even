export default function makeDeleteDepartment({ removeDepartment, log, headers }) {
   return async function deleteDepartment(httpRequest) {
      try {
         const deleted = await removeDepartment({ id: httpRequest.params.id })
         return {
            headers,
            statusCode: deleted.deletedCount === 0 ? 404 : 200,
            body: { success: true, data: deleted },
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
