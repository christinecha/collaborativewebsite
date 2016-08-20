import { isValidImageSrc } from '../utils/image-link-validation'

/** Validating all the node types' data.
  * Better sanitized on write than read.
 **/
export const NODE_TYPES = {
  text: {
    text:   (text)    => { return (typeof text === 'string' && text.length <= 100) },
    coords: ([x, y])  => { return (typeof x === 'number' && typeof y === 'number') }
  },
  image: {
    url:    (url)     => { return (typeof url === 'string' && isValidImageSrc(url)) }
  }
}

export const isValidNode = (config) => {
  if (!config) return false

  const { type, data } = config

  if ( !type
    || !data
    || !NODE_TYPES[type]
  ) return false

  const model = NODE_TYPES[type]

  for (let i in model) {
    if (!data[i]) return false

    const validate = model[i]
    if (!validate(data[i])) return false
  }

  return true
}
