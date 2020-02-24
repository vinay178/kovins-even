export default function buildMakeUser() {
    return function makeUser({
        email,
        password
    } = {}) {
        if (!email) throw new Error('Email is required')
        if (email.length < 6) throw new Error('Email is not valid.')
        if (!password) throw new Error('Email is required')
        if (password.length < 6) throw new Error('Password is too short.')

        return Object.freeze({
            geEmail: () => email,
            getPassword: () => password,
        })
    }
}