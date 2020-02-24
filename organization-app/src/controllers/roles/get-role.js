export default function makeGetRoles({ listRole, log, headers }) {
   return async function getRoles(httpRequest) {
      try {
         const roles = await listRole({ id: httpRequest.params.id })
         return {
            headers,
            statusCode: 200,
            body: { success: true, data: roles },
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
