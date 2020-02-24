export default function makeLogin({ userVerification, firebaseAuthentication, log, headers }) {
    return async function login(httpRequest) {
        try {
            const email = await firebaseAuthentication(httpRequest)
            if (!email)
                return {
                    headers,
                    statusCode: 401,
                    body: { success: false, message: "You are not authorized" },
                }
            const user = await userVerification({ email })
            if (user && user.role) {

                const { role: { dataValues: { organization_id } } } = user
                user.oid = organization_id
            }
            if (!user)
                return {
                    headers,
                    statusCode: 404,
                    body: { success: false, message: "User not found or user is not active" },
                }
            return {
                headers,
                statusCode: 200,
                body: { success: true, data: user },
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