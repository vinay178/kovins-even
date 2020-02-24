export default function makeUserVerification({ userDb }) {
    return async function userVerification({ email }) {
        if (!email) throw new Error('User email is required')
        const user = await userDb.findUserByEmail({ email })
        return user
    }
}