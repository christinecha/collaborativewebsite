const NODE_TYPES = {
  text: ['font', 'text', 'coords'],
  image: ['src']
}

/** Validating all the node types' data. **/
export const isValidConfig = (config) => {
  if (!config) return false

  const { type, data } = config

  if ( !type
    || !data
    || !NODE_TYPES[type]
  ) return false

  const model = NODE_TYPES[type]

  for (let i in model) {
    if (!data[i]) return false
  }

  return true
}
