import makeFakeUser from '../../../__test/fakeData/user'
import makeUser from './'
var expect = require('chai').expect

describe('User Entity', () => {
   it('must have first name', () => {
      const user = makeFakeUser({ firstname: null })
      expect(() => makeUser(user)).to.throw('User must have a first name.')
   })
   it('first name must be longer enough', () => {
      const user = makeFakeUser({ firstname: 'wo' })
      expect(() => makeUser(user)).to.throw('User first name must be longer than 2 characters.')
   })
   it('must have last name', () => {
      const user = makeFakeUser({ lastname: null })
      expect(() => makeUser(user)).to.throw('User must have a last name.')
   })
   it('first name must be longer enough', () => {
      const user = makeFakeUser({ lastname: 'wo' })
      expect(() => makeUser(user)).to.throw('User last name must be longer than 2 characters.')
   })
   it('must have gender', () => {
      const user = makeFakeUser({ gender: null })
      expect(() => makeUser(user)).to.throw('User must have gender details')
   })
   it('gender must be one of male, female or others', () => {
      const user = makeFakeUser({ gender: 'boo' })
      expect(() => makeUser(user)).to.throw('User gender must be male, female or others.')
   })
   it('valid gender must not throw error', () => {
      const user = makeFakeUser({ gender: 'female' })
      expect(() => makeUser(user)).not.to.throw('User last name must be longer than 2 characters.')
   })
   it('must have email address', () => {
      const user = makeFakeUser({ emailaddress: null })
      expect(() => makeUser(user)).to.throw('User must have a email.')
   })
   it('must have phone number', () => {
      const user = makeFakeUser({ phone_number: null })
      expect(() => makeUser(user)).to.throw('User must have a phone number.')
   })
   it('must have an role id', () => {
      const user = makeFakeUser({ roles_id: null })
      expect(() => makeUser(user)).to.throw('User must have a roles id.')
   })
   it('role id must be number', () => {
      const user = makeFakeUser({ roles_id: 'roles' })
      expect(() => makeUser(user)).to.throw('User role id must be a number')
   })
   it('must have an location id', () => {
      const user = makeFakeUser({ locations_id: null })
      expect(() => makeUser(user)).to.throw('User must have a location id.')
   })
   it('location id must be number', () => {
      const user = makeFakeUser({ locations_id: 'location' })
      expect(() => makeUser(user)).to.throw('User location id must be a number')
   })
   it('deactivate() must set is_active to false', () => {
      const user = makeFakeUser({})
      const userObj = makeUser(user)
      userObj.deactivate()
      expect(userObj.getIsActive()).to.equal(false)
   })
   it('activate() must set is_active to false', () => {
      const user = makeFakeUser()
      const userObj = makeUser(user)
      userObj.activate()
      expect(userObj.getIsActive()).to.equal(true)
   })
   it('All valid fields must not throw error', () => {
      const user = makeFakeUser()
      expect(() => makeUser(user)).not.to.throw()
   })
})
