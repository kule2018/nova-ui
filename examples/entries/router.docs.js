import Router from '../assets/router'

const Button = require('../docs/components/button.md')
const Input = require('../docs/components/input.md')
const Checkbox = require('../docs/components/checkbox.md')
const Modal = require('../docs/components/modal.md')




const $contianer = document.getElementById('container')

function setPage (page, title, cb) {
  return function () {
    $contianer.innerHTML = page
    document.title = `${title} | Nova UI Components`
    setTimeout(() => {
      cb && typeof cb === 'function' && cb()
    })
  }
}


function runScript () {
  let $code = document.querySelectorAll('.code-view')
  Array.prototype.slice.call($code).forEach(el => {
    let code = JSON.parse(el.getAttribute('data-eval'))
    if (code.script) {
      var source = new Function(code.script)
      source()
    }
  })
}

function routerChange (newPath, oldPath) {
  if (oldPath === newPath) {
    return
  }
  window.instances.forEach(instance => {
    instance.destroy && instance.destroy()
  })
  window.instances.length = 0
  window.scrollTo(0, 0)
}


export const router = new Router(routerChange)

router
  .set('/')
  .set('/button', setPage(Button, 'Button'))
  .set('/input', setPage(Input, 'Input'))
  .set('/checkbox', setPage(Checkbox, 'Checkbox'))
  .set('/modal', setPage(Modal, 'Modal', runScript))
  .init()



// events 
document.addEventListener('click', function (e) {
  var target = e.target;
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.code-view__ctrl'))
  var matched
  for (let i = 0, len = nodes.length; i < len; i++) {
    const node = nodes[i]
    if (node === target || node.contains(target)) {
      matched = node
      break
    }
  }
  if (matched) {
    var $panel = matched.parentNode
    $panel.classList.toggle('source-opened')
  }
})




export default router