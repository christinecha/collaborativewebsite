class ImageNode {

  constructor(config) {
    this.$node = document.createElement('img')
    this.$node.classList.add('image-node')

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
    if (!this.data || !this.data.src) this.$node.src = './assets/placeholder-image.png'
    else this.$node.src = this.data.src

    if (this.previewMode) this.$node.classList.add('preview-mode')
    else this.$node.classList.remove('preview-mode')

    if (!this.data || !this.data.coords) return
    this.$node.style.left = this.data.coords[0] + 'px'
    this.$node.style.top = this.data.coords[1] + 'px'
  }
}

export default ImageNode
