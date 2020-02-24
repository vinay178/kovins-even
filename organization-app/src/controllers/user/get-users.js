export default function makeGetUsers({ listUsers, log, headers }) {
   return async function getUsers(httpRequest) {
      try {
         const users = await listUsers({
            role: httpRequest.headers.role,
            id: httpRequest.uid,
         })
         return {
            headers,
            statusCode: 200,
            body: { success: true, data: users },
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
