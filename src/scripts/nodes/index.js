const NODE_TYPES = {
  box: ['size', 'color'],
  text: ['color', 'font', 'size', 'text', 'coords'],
  image: ['size', 'src']
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

  model.forEach(i => {
    if (!data[i]) return false
  })

  return true
}
