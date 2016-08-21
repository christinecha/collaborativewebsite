console.log('----------------------------------------------------------------------')
console.log('source code ----> https://github.com/christinecha/collaborativewebsite')
console.log('----------------------------------------------------------------------')

import NodeEditor from './nodes/node-editor'
import TextNode from './nodes/text-node'
import ImageNode from './nodes/image-node'
import { isValidConfig } from './nodes'
import { isValidImageSrc } from './utils/image-link-validation'

const $editor = document.getElementById('node-editor')
const $wtf = document.getElementById('wtf')
const $warning = document.getElementById('warning')
const $mailingList = document.getElementById('mailing-list')
const $triggerOpen = document.querySelector('.trigger-open')
const $triggerClose = document.querySelector('.trigger-close')

const nodesRef = firebase.database().ref('/nodes')
const nodeEditor = new NodeEditor({
  handleSubmit: (config) => handleSubmitNode(config)
})

const NODE_CONSTRUCTORS = {
  text: TextNode,
  image: ImageNode
}

let currentUID = null
let renderedNodes = {}

/* -------------------------------------------------------- */

const warn = (message) => {
  $warning.textContent = message
  $warning.classList.add('is-active')

  setTimeout(() => {
    $warning.classList.remove('is-active')
  }, 3000)
}

const handleSubmitNode = (config) => {
  if (!isValidConfig(config)) return

  let data = {
    coords: config.data.coords,
    size: config.data.size
  }

  if (config.type === 'text') {
    data.text = config.data.text
    data.font = config.data.font
    config.data = data
    createNode(config)
  }

  if (config.type === 'image') {
    data.src = config.data.src
    config.data = data
    isValidImageSrc(data.src)
    .then(() => createNode(config))
    .catch(error => warn(error))
  }
}

const createNode = (config) => {
  const node = {
    type: config.type,
    data: config.data,
    createdBy: currentUID,
    createdAt: new Date().getTime()
  }

  nodesRef.push(node)
  // .then(nodeRef => console.log('Node created at ' + nodeRef.getKey()) )
  .catch(error => console.warn(error) )
}

const renderNodes = (nodes) => {
  for (let i in nodes) {
    if (renderedNodes[i]) {
      const node = renderedNodes[i]
      node.update(nodes[i])
    } else {
      const NodeConstructor = NODE_CONSTRUCTORS[nodes[i].type]
      renderedNodes[i] = new NodeConstructor(nodes[i])
    }
  }
}

/* This function watches the value of /nodes and will
* fire the callback every time the value changes.
*/
const now = new Date().getTime()
const oneDayAgo = now - (1000 * 60 * 60 * 24)

const cleanNodes = () => {
  firebase.database().ref('/nodes')
  .orderByChild('createdAt')
  .endAt(oneDayAgo)
  .once('value', snapshot => {
    const nodes = snapshot.val()
    for (let i in nodes) {
      firebase.database().ref(`/nodes/${i}`).remove()
    }
  })
}

const watchNodes = (callback) => {
  firebase.database().ref('/nodes')
  .orderByChild('createdAt')
  .startAt(oneDayAgo)
  .on('value', snapshot => {
    const nodes = snapshot.val()
    callback(nodes)
  })
}

/** EVENT LISTENERS ---------------------------------**/

document.addEventListener('click', (e) => {
  const targets = e.path

  if (targets.indexOf($editor) > -1) return
  if (targets.indexOf($wtf) > -1) {
    if (e.target === $triggerOpen) $wtf.setAttribute('data-status', 'opened')
    if (e.target === $triggerClose) $wtf.setAttribute('data-status', 'closed')
    return
  }

  const x = e.pageX
  const y = e.pageY
  nodeEditor.renderAt(x, y)
})

$mailingList.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.getElementById('email-input').value
  firebase.database().ref('/emails').push({
    email: email,
    createdAt: new Date().getTime()
  }).then(() => {
    $mailingList.innerHTML = '<p>you are great</p>'
  })
})



/** Authenticate the user.
  * This is necessary so that a user can edit her/his own nodes -
  * only within the SAME session - and no one else's.
 **/

firebase.auth().onAuthStateChanged(auth => {

  if (!auth || !auth.uid) {
    firebase.auth().signInAnonymously()
    return
  }

  currentUID = auth.uid
  cleanNodes()
  watchNodes(renderNodes)
})
