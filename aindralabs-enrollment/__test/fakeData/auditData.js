import faker from 'faker'

export default function makeFakeAuditData(overrides) {
    const fakeAuditData = {
      correlationId: faker.random.uuid(),
      status: faker.random.word(),
      data: faker.random.words(),
      }
    return {
        ...fakeAuditData,
        ...overrides
    }
}
