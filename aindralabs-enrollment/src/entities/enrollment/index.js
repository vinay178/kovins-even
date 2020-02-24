import buildMakeEnrollment from './enrollment'
import extractDataFromFileName from '../utility'

const makeEnrollment = buildMakeEnrollment({extractDataFromFileName})

export default makeEnrollment
