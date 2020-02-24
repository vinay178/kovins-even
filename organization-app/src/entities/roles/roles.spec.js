import makeFakeRoles from '../../../__test/fakeData/roles'
import makeRole from './'
var expect = require('chai').expect

describe('Organization Role Entity', () => {
   it('Must have a name', () => {
      const role = makeFakeRoles({ role_name: null })
      expect(() => makeRole(role)).to.throw('Role must have a name')
   })

   it('Role name must be more than 2 characters', () => {
      const role = makeFakeRoles({ role_name: 's' })
      expect(() => makeRole(role)).to.throw('Role name must be longer than 2 characters')
   })

   it('Valid role name must not throw error', () => {
      const role = makeFakeRoles({ role_name: 'Manager' })
      expect(() => makeRole(role)).to.not.throw(Error)
   })

   it('Must have an organization id', () => {
      const role = makeFakeRoles({ organization_id: null })
      expect(() => makeRole(role)).to.throw('Roles must have an organization id')
   })

   it('Organization id must be a number', () => {
      const role = makeFakeRoles({ organization_id: 'hello' })
      expect(() => makeRole(role)).to.throw('Roles organization id must be number')
   })

   it('Valid organization id must not throw error', () => {
      const role = makeFakeRoles()
      expect(() => makeRole(role)).to.not.throw(Error)
   })

   it('Parent role must be a number', () => {
      const role = makeFakeRoles({ parent_role: 'hello' })
      expect(() => makeRole(role)).to.throw('Roles parent role must be a number')
   })

   it('Valid parent role must not throw error', () => {
      const role = makeFakeRoles()
      expect(() => makeRole(role)).to.not.throw(Error)
   })

   it('Mark delete/ Soft delete', () => {
      const role = makeFakeRoles()
      const roleEntity = makeRole(role)
      roleEntity.markDeleted()

      expect(roleEntity.getIsActive()).to.equal(false)
      expect(roleEntity.getDeleted()).to.equal(true)
   })

   it('deactivate() must set is_active to false', () => {
      const role = makeFakeRoles()
      const roleEntity = makeRole(role)
      roleEntity.deactivate()
      expect(roleEntity.getIsActive()).to.equal(false)
   })

   it('activate() must set is_active to false', () => {
      const role = makeFakeRoles()
      const roleEntity = makeRole(role)
      roleEntity.activate()
      expect(roleEntity.getIsActive()).to.equal(true)
   })
})
