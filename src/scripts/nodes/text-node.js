/** Render a text node.
*  @param config {Object} |
*    type: {String}
*    data: {
*      text: {String}
*      coords: {Array}
*    }
*    createdBy: {String}
*  @param destinationSelector {String} | A DOMNode selector
**/
class TextNode {

  constructor(config) {
    this.$node = document.createElement('div')
    this.$node.classList.add('text-node')

    document.body.appendChild(this.$node)
    if (!config) return
    if (config.previewMode) this.previewMode = config.previewMode
    if (config.data) {
      this.data = config.data
      this.render()
    }
  }

  destroy() {
    document.body.removeChild(this.$node)
  }

  hide() {
    this.$node.style.display = 'none'
  }

  show() {
    this.$node.style.display = 'block'
  }

  update(config) {
    this.data = config.data
    this.previewMode = config.previewMode
    this.render()
  }

  render() {
    if (!this.data.text || this.data.text === '') this.$node.innerHTML = '&nbsp;'
    else this.$node.textContent = this.data.text

    this.$node.style.left = this.data.coords[0] + 'px'
    this.$node.style.top = this.data.coords[1] + 'px'

    if (this.data.font) this.$node.setAttribute('font', this.data.font)

    if (this.previewMode) this.$node.classList.add('preview-mode')
    else this.$node.classList.remove('preview-mode')

  }
}

export default TextNode
