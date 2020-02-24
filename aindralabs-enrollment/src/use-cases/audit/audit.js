export default function makeAuditEnrollmentUseCase ({ auditDb }) {
  return Object.freeze({
    insert,
    update,
    getAll
  })

   async function insert (auditInfo) {
    const storeData = await auditDb.insertTo({...auditInfo});
    return storeData
  }

  async function update (auditInfoUpdated) {
    const updateData = await auditDb.update({...auditInfoUpdated})
    return updateData
  }

  async function getAll () {
    const data = await auditDb.findAll()
    return data;
  }
}
