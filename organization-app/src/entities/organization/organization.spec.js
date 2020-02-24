import makeFakeOrganization from '../../../__test/fakeData/organization'
import makeOrganization from './'
var expect = require('chai').expect

describe('Organization Entity', () => {
   it('must have a name', () => {
      const organization = makeFakeOrganization({ org_name: null })
      expect(() => makeOrganization(organization)).to.throw('Organization must have a name.')
   })

   it('name must be longer that 2 characters', () => {
      const organization = makeFakeOrganization({ org_name: 'h' })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization name must be longer than 2 characters.',
      )
   })

   it('must shave a smart verification type', () => {
      const organization = makeFakeOrganization({ smart_verification_type: null })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization must have a smart verification type',
      )
   })

   it('Smart verification must have value verification or recognition', () => {
      const organization = makeFakeOrganization({ smart_verification_type: 'Apple' })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization smart verification type must be verification or recognition.',
      )
   })

   it('must not throw error when smart verification type is verification', () => {
      const organization = makeFakeOrganization({ smart_verification_type: 'verification' })
      expect(() => makeOrganization(organization)).to.not.throw(Error)
   })

   it('must have geofencing active', () => {
      const organization = makeFakeOrganization({ geofencing_active: null })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization must have geo fencing active',
      )
   })

   it('must not throw geofencing active error', () => {
      const organization = makeFakeOrganization({ geofencing_active: true })
      expect(() => makeOrganization(organization)).to.not.throw(Error)
   })

   it('must have geofencing_radius', () => {
      const organization = makeFakeOrganization({ geofencing_radius: null })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization must have a geo fencing radius',
      )
   })

   it('geofencing_radius must be an number', () => {
      const organization = makeFakeOrganization({ geofencing_radius: 'apple' })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization geo fencing radius is not a number',
      )
   })

   it('must have geofencing type id', () => {
      const organization = makeFakeOrganization({ geo_fencing_type_id: null })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization must have a geo fencing id',
      )
   })

   it('must have website access active', () => {
      const organization = makeFakeOrganization({ website_access_active: null })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization must have website_access_active',
      )
   })

   it('must not throw website access active error', () => {
      const organization = makeFakeOrganization({ website_access_active: false })
      expect(() => makeOrganization(organization)).to.not.throw(Error)
   })

   it('must have licence plan type', () => {
      const organization = makeFakeOrganization({ license_plan_type: null })
      expect(() => makeOrganization(organization)).to.throw(
         'Organization must have license pate type',
      )
   })

   it('must not throw licence plan type error', () => {
      const organization = makeFakeOrganization({ license_plan_type: 'ASVAS' })
      expect(() => makeOrganization(organization)).to.not.throw(
         'Organization must have license pate type',
      )
   })

   it('must have licence key', () => {
      const organization = makeFakeOrganization({ license_key: null })
      expect(() => makeOrganization(organization)).to.throw('Organization must have license key')
   })

   it('must not throw licence key error', () => {
      const organization = makeFakeOrganization({ license_key: 'ASQWD12' })
      expect(() => makeOrganization(organization)).to.not.throw(
         'Organization must have license key',
      )
   })

   it('must have a country id', () => {
      const organization = makeFakeOrganization({ country_id: null })
      expect(() => makeOrganization(organization)).to.throw('Organization must have country id')
   })

   it('must not throw a country id error', () => {
      const organization = makeFakeOrganization({})
      expect(() => makeOrganization(organization)).to.not.throw('Organization must have country id')
   })

   it('deactivate() must set is_active to false', () => {
      const organization = makeFakeOrganization({})
      const makeOrg = makeOrganization(organization)
      makeOrg.deactivate()
      expect(makeOrg.getIsActive()).to.equal(false)
   })

   it('activate() must set is_active to false', () => {
      const organization = makeFakeOrganization()
      const makeOrg = makeOrganization(organization)
      makeOrg.activate()
      expect(makeOrg.getIsActive()).to.equal(true)
   })
})
