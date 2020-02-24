import buildMakeVerification from './verification'
import extractDataFromFileName from '../utility'

const makeVerification = buildMakeVerification({ extractDataFromFileName })

export default makeVerification
