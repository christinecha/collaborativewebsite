import TextNode from './text-node'

const INPUT_TYPES = {
  'node-text': 'nodeText',
  'node-font': 'nodeFont'
}

class NodeEditor {
  constructor(config) {
    this.handleSubmit = config.handleSubmit

    this.$container = document.getElementById('node-editor')
    this.$submitButton = document.getElementById('submit-node')
    this.$nodeText = document.getElementById('node-text')
    this.$nodeFont = document.getElementById('node-font')

    this.previewNode = new TextNode({ previewNode: true })

    this.initEventListeners()
  }

  clearFields() {
    this.$nodeText.value = ''
    this.$nodeFont.value = 'open-sans'

    this.nodeText = ''
    this.nodeFont = 'open-sans'

    this.previewNode.update(this.getConfig())
  }

  initEventListeners() {
    this.$nodeText.addEventListener('keyup', this.handleChange.bind(this))
    this.$nodeFont.addEventListener('change', this.handleChange.bind(this))

    this.$submitButton.addEventListener('click', this.submitNode.bind(this))
  }

  getConfig() {
    return {
      previewNode: true,
      type: 'text',
      data: {
        text: this.nodeText,
        coords: this.coords,
        font: this.nodeFont || 'open-sans'
      }
    }
  }

  handleChange(e) {
    e.preventDefault()
    const key = INPUT_TYPES[e.target.id]
    this[key] = e.target.value

    this.previewNode.update(this.getConfig())
  }

  hide() {
    this.$container.style.display = 'none'
    this.previewNode.hide()
  }

  renderAt(x, y) {
    this.coords = [x, y]

    this.$container.style.display = 'block'
    this.$container.style.left = x + 'px'
    this.$container.style.top = y + 'px'

    this.previewNode.update(this.getConfig())
    this.previewNode.show()
  }

  submitNode(e) {
    e.preventDefault()
    if (this.handleSubmit) this.handleSubmit(this.getConfig())

    this.hide()
    this.clearFields()
  }
}

export default NodeEditor
