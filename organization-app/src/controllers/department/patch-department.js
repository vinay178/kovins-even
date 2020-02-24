export default function makePatchDepartment({ editDepartment, log, headers }) {
   return async function patchDepartment(httpRequest) {
      try {
         const departmentInfo = httpRequest.body
         const toEdit = {
            id: httpRequest.params.id,
            ...departmentInfo,
         }
         const patched = await editDepartment(toEdit)
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
}
