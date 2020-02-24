import makeFakeLocation from '../../../__test/fakeData/location'
import makeLocation from './'

var expect = require('chai').expect

describe('Location Entity', () => {
   it('must have name', () => {
      const location = makeFakeLocation({ name: null })
      expect(() => makeLocation(location)).to.throw('Location must have a name.')
   })
   it('name must be longer enough', () => {
      const location = makeFakeLocation({ name: 'wo' })
      expect(() => makeLocation(location)).to.throw(
         'Location name must be longer than 2 characters.',
      )
   })
   it('valid name must not throw error', () => {
      const location = makeFakeLocation({ name: 'India' })
      expect(() => makeLocation(location)).not.to.throw()
   })
   it('must have address', () => {
      const location = makeFakeLocation({ address: null })
      expect(() => makeLocation(location)).to.throw('Location must have a address.')
   })
   it('address must be longer enough', () => {
      const location = makeFakeLocation({ address: 'wo' })
      expect(() => makeLocation(location)).to.throw(
         'Location address must be longer than 2 characters.',
      )
   })
   it('must have city', () => {
      const location = makeFakeLocation({ city: null })
      expect(() => makeLocation(location)).to.throw('Location must have a city.')
   })

   it('must have state', () => {
      const location = makeFakeLocation({ state: null })
      expect(() => makeLocation(location)).to.throw('Location must have a state.')
   })

   it('must have pincode', () => {
      const location = makeFakeLocation({ pincode: null })
      expect(() => makeLocation(location)).to.throw('Location must have a pincode.')
   })
   it('must have an organization id', () => {
      const location = makeFakeLocation({ organization_id: null })
      expect(() => makeLocation(location)).to.throw('Location must have a organization id')
   })
   it('must have a country id', () => {
      const location = makeFakeLocation({ country_id: null })
      expect(() => makeLocation(location)).to.throw('Location must have a country id')
   })

   it('All valid fields must not throw error', () => {
      const location = makeFakeLocation({ dept_name: 'software' })
      expect(() => makeLocation(location)).not.to.throw()
   })
})
