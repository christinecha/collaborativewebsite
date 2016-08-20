export const isValidImageSrc = (url) => {
  return new Promise((resolve, reject) => {
    let $img = document.createElement('img')

    $img.onload = () => {
      const height = $img.height
      const width = $img.width

      if (height > 1000 || width > 1000) reject('The max image size is 1000px in either direction.')
      else resolve()
    }

    $img.onerror = () => reject('This is not a valid image source.')

    $img.src = url
  })
}
