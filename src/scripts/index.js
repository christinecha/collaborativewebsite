import NodeEditor from './nodes/node-editor'
import TextNode from './nodes/text-node'
import { isValidNode } from './nodes'

const nodesRef = firebase.database().ref('/nodes')
const nodeEditor = new NodeEditor({
  handleSubmit: (config) => createNode(config)
})

let currentUID = null
let renderedNodes = {}

/* -------------------------------------------------------- */

const createNode = (config) => {
  if (!isValidNode(config)) return

  const node = {
    type: config.type,
    data: config.data,
    createdBy: currentUID,
    createdAt: new Date().getTime()
  }

  nodesRef.push(node)
  .then(nodeRef => console.log('Node created at ' + nodeRef.getKey()) )
  .catch(error => console.warn(error) )
}

const renderNodes = (nodes) => {
  for (let i in nodes) {
    if (nodes[i].type === 'text') {
      if (renderedNodes[i]) {
        const node = renderedNodes[i]
        node.update(nodes[i])
      } else {
        const node = new TextNode(nodes[i])
        renderedNodes[i] = node
      }
    }
  }
}

/* This function watches the value of /nodes and will
* fire the callback every time the value changes.
*/
const watchNodes = (callback) => {
  firebase.database().ref('/nodes').on('value', snapshot => {
    const nodes = snapshot.val()
    callback(nodes)
  })
}

document.addEventListener('click', (e) => {
  const targets = e.path
  const $editor = document.getElementById('node-editor')

  if (targets.indexOf($editor) > -1) return

  const x = e.clientX
  const y = e.clientY
  nodeEditor.renderAt(x, y)
})


/** Authenticate the user.
  * This is necessary so that a user can edit her/his own nodes -
  * only within the SAME session - and no one else's.
 **/

firebase.auth().onAuthStateChanged(auth => {

  if (!auth.uid) {
    firebase.auth().signInAnonymously()
    return
  }

  currentUID = auth.uid
  watchNodes(renderNodes)
})
