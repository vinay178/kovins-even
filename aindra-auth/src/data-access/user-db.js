export default function makeUserDb({ userMakeDb, departmentMakeDb, rolesMakeDb, locationMakeDb }) {
    return Object.freeze({
        findUserByEmail,
    })

    async function findUserByEmail({ email }) {
        const db = new Promise((resolve, reject) => {
            userMakeDb
                .findOne({
                    where: { emailaddress: email, is_active: true, deleted: false },
                    include: [{
                            model: rolesMakeDb,
                            as: 'role',
                        },
                        {
                            model: departmentMakeDb,
                            as: 'department',
                        },
                        {
                            model: locationMakeDb,
                            as: 'location',
                        },
                        {
                            model: userMakeDb,
                            as: 'manager',
                        },
                    ],
                })
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })

        const res = await db.then(
            res => {
                return res
            },
            error => {
                return
            },
        )

        if (res) return res.dataValues
        else return
    }
}