export const isValidImageSrc = (url) => {
  return new Promise((resolve, reject) => {
    let $img = document.createElement('img')
    $img.onload = () => resolve()
    $img.onerror = () => reject()
    $img.src = url
  })
}
