import buildMakeLicenseKey from './license-keys'
import crc32 from 'crc-32'

const makeLicenseKey = buildMakeLicenseKey({ crc32 })

export default makeLicenseKey
