import TextNode from './text-node'
import ImageNode from './image-node'
import BoxNode from './box-node'

const INPUT_TYPES = {
  'node-color'      : 'nodeColor',
  'node-text'      : 'nodeText',
  'node-type'      : 'nodeType',
  'node-font'      : 'nodeFont',
  'node-size'      : 'nodeSize',
  'node-image-src' : 'nodeImageSrc'
}

class NodeEditor {
  constructor(config) {
    this.handleSubmit = config.handleSubmit

    this.$container = document.getElementById('node-editor')
    this.$submitButton = document.getElementById('submit-node')
    this.$nodeType = document.getElementById('node-type')
    this.$nodeText = document.getElementById('node-text')
    this.$nodeFont = document.getElementById('node-font')
    this.$nodeSize = document.getElementById('node-size')
    this.$nodeColor = document.getElementById('node-color')
    this.$nodeImageSrc = document.getElementById('node-image-src')

    this.previewTextNode = new TextNode({ previewMode: true })
    this.previewImageNode = new ImageNode({ previewMode: true })
    this.previewBoxNode = new BoxNode({ previewMode: true })

    this.previewImageNode.hide()
    this.previewBoxNode.hide()

    this.nodeType = 'text'
    this.nodeSize = 'medium'
    this.nodeFont = 'inconsolata'
    this.nodeColor = '#000000'

    this.initEventListeners()
  }

  clearFields() {
    this.$nodeText.value = ''
    this.$nodeFont.value = 'inconsolata'
    this.$nodeSize.value = 'medium'
    this.$nodeImageSrc.value = ''

    this.nodeColor = '#000000'
    this.nodeText = ''
    this.nodeFont = 'inconsolata'
    this.nodeSize = 'medium'
    this.nodeImageSrc = ''

    this.updatePreviewNodes()
  }

  initEventListeners() {
    this.$nodeText.addEventListener('keyup', this.handleChange.bind(this))
    this.$nodeImageSrc.addEventListener('keyup', this.handleChange.bind(this))
    this.$nodeType.addEventListener('change', this.handleChange.bind(this))
    this.$nodeFont.addEventListener('change', this.handleChange.bind(this))
    this.$nodeSize.addEventListener('change', this.handleChange.bind(this))

    this.$nodeColor.addEventListener('click', this.changeColor.bind(this))
    this.$submitButton.addEventListener('click', this.submitNode.bind(this))
  }

  getConfig() {
    return {
      previewMode: true,
      type: this.nodeType || 'text',
      data: {
        color: this.nodeColor,
        src: this.nodeImageSrc,
        size: this.nodeSize || 'medium',
        text: this.nodeText,
        coords: this.coords,
        font: this.nodeFont || 'inconsolata'
      }
    }
  }

  changeColor() {
    const chars = '0123456789abcdef'.split('')
    let hex = '#'

    while (hex.length < 7) {
      const rand = Math.round(Math.random() * (chars.length - 1))
      hex += chars[rand]
    }

    this.nodeColor = hex
    this.updatePreviewNodes()
  }

  handleChange(e) {
    e.preventDefault()
    const key = INPUT_TYPES[e.target.id]
    this[key] = e.target.value

    this.$container.setAttribute('type', this.nodeType)
    this.updatePreviewNodes()
  }

  updatePreviewNodes() {
    if (this.nodeType === 'text')  {
      this.previewTextNode.update(this.getConfig())
      this.previewTextNode.show()
      this.previewBoxNode.hide()
      this.previewImageNode.hide()
    }

    if (this.nodeType === 'image') {
      this.previewImageNode.update(this.getConfig())
      this.previewImageNode.show()
      this.previewBoxNode.hide()
      this.previewTextNode.hide()
    }

    if (this.nodeType === 'box') {
      this.previewBoxNode.update(this.getConfig())
      this.previewBoxNode.show()
      this.previewImageNode.hide()
      this.previewTextNode.hide()
    }
  }

  hide() {
    this.$container.style.display = 'none'
    this.previewTextNode.hide()
    this.previewImageNode.hide()
    this.previewBoxNode.hide()
  }

  renderAt(x, y) {
    this.coords = [x, y]

    this.$container.style.display = 'inline-block'

    if ((window.innerWidth - x) < this.$container.clientWidth) {
      this.$container.style.right = 0
      this.$container.style.left = 'auto'
      this.$container.style.top = y + 'px'
    } else {
      this.$container.style.right = 'auto'
      this.$container.style.left = x + 'px'
      this.$container.style.top = y + 'px'
    }

    if ((y - this.$container.clientHeight) < 0) this.$container.style.top = this.$container.clientHeight + 'px'

    this.$nodeText.focus()

    this.updatePreviewNodes()
  }

  submitNode(e) {
    e.preventDefault()
    if (this.handleSubmit) this.handleSubmit(this.getConfig())

    this.clearFields()
    this.hide()
  }
}

export default NodeEditor
