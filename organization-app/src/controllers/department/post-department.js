export default function makePostDepartment({ addDepartment, log }) {
   return async function postDepartment(httpRequest) {
      try {
         const departmentInfo = httpRequest.body
         const posted = await addDepartment(departmentInfo)
         return {
            headers: {
               'Content-Type': 'application/json',
            },
            statusCode: 201,
            body: { success: true, data: posted },
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
