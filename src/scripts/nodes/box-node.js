class BoxNode {

  constructor(config) {
    this.$node = document.createElement('div')
    this.$node.classList.add('box-node')

    document.body.appendChild(this.$node)

    if (!config) return
    if (config.previewMode) this.previewMode = config.previewMode
    if (config.data) this.data = config.data

    this.render()
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
    if (this.previewMode) this.$node.classList.add('preview-mode')
    else this.$node.classList.remove('preview-mode')

    if (!this.data) return

    if (this.data.size) this.$node.setAttribute('size', this.data.size)
    if (this.data.color) this.$node.style.backgroundColor = this.data.color

    if (this.data.coords) {
      this.$node.style.left = this.data.coords[0] + 'px'
      this.$node.style.top = this.data.coords[1] + 'px'
    }
  }
}

export default BoxNode
