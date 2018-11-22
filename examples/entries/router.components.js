import Router from '../assets/router'
import ICONS from './icon'

// Native
const Button = require('../docs/components/button.md')
const Icon = require('../docs/components/icon.md')
const Input = require('../docs/components/input.md')
const Checkbox = require('../docs/components/checkbox.md')
const Radio = require('../docs/components/radio.md')
const Switch = require('../docs/components/switch.md')
const Modal = require('../docs/components/modal.md')
const Breadcrumb = require('../docs/components/breadcrumb.md')
const Badge = require('../docs/components/badge.md')
const InputNumber = require('../docs/components/input-number.md')
const Table = require('../docs/components/table.md')
const Tree = require('../docs/components/tree.md')
const Select = require('../docs/components/select.md')
const Pagination = require('../docs/components/pagination.md')
const Slider = require('../docs/components/slider.md')
const Alert = require('../docs/components/alert.md')
const Message = require('../docs/components/message.md')
const MessageBox = require('../docs/components/message-box.md')
const Popover = require('../docs/components/popover.md')
const Tag = require('../docs/components/tag.md')


// VUE
const RadioVue = require('../docs/components/vue/radio.md')
const CheckboxVue = require('../docs/components/vue/checkbox.md')
const SwitchVue = require('../docs/components/vue/switch.md')
const InputNumberVue = require('../docs/components/vue/input-number.md')
const TreeVue = require('../docs/components/vue/tree.md')
const SelectVue = require('../docs/components/vue/select.md')
const PaginationVue = require('../docs/components/vue/pagination.md')
const SliderVue = require('../docs/components/vue/slider.md')
const ModalVue = require('../docs/components/vue/modal.md')
const AlertVue = require('../docs/components/vue/alert.md')
const MessageVue = require('../docs/components/vue/message.md')
const MessageBoxVue = require('../docs/components/vue/message-box.md')
const PopoverVue = require('../docs/components/vue/popover.md')
const TagVue = require('../docs/components/vue/tag.md')


function genIconsTpl () {
  let li = ''
  ICONS.split(',').forEach(icon => {
    icon = icon.trim()
    li += `<li><i class="nv-icon-${icon}"></i><span class="label">${icon}</span></li>`
  })
  const $iconWrap =  document.getElementById('icon-list')
  $iconWrap.innerHTML = li 
  const $currentValue = document.getElementById('current-font-value')
  document.getElementById('font-adjust').onchange = function () {
    $iconWrap.style.fontSize = this.value + 'px'
    $currentValue.textContent = this.value + 'PX'
  }
}


const $contianerNative = document.getElementById('container-native')
const $contianerVue = document.getElementById('container-vue')

function setPage(pages, title, cb) {
  return function () {
    $contianerNative.innerHTML = pages.native
    $contianerVue.innerHTML = pages.vue || '同原生用法'
    document.title = `${title} | Nova UI Components`
    setTimeout(() => {
      cb && typeof cb === 'function' && cb()
    })
  }
}


function runScript() {
  let $code = document.querySelectorAll('.code-view')
  Array.prototype.slice.call($code).forEach(el => {
    let codeNative = el.getAttribute('data-eval')
    let codeVue = el.getAttribute('data-vue-eval')
    if (codeNative) {
      codeNative = JSON.parse(codeNative)
      if (codeNative.script) {
        var source = new Function(codeNative.script)
        source()
      }
    }

    if (codeVue) {
      codeVue = JSON.parse(codeVue)
      let source = Object.create(null)
      if (codeVue.code) {
        let code = `
            var exports = Object.create(null);
            ${codeVue.code}
            return exports;
          `
        let res = (new Function(code))()
        source = res.default
      }
      if (codeVue.template) {
        source.template = codeVue.template
      }
      // let scripts = codeVue.script
      // let source = scripts || Object.create(null)
      let $container = el.querySelector('.code-view__view')
      let vm = new window.Vue(source).$mount()
      $container.appendChild(vm.$el)
      // console.log(vm)
      window.instances.push(vm)
    }
  })
}

const $tabs = document.querySelectorAll('.doc-tabs__item')
const $tabPanels = document.querySelectorAll('.doc-panel')

function routerChange(newPath, oldPath) {
  if (oldPath === newPath) {
    return
  }
  $tabs.forEach(($tab, idx) => {
    $tab.classList[idx === 0 ? 'add' : 'remove']('doc-tabs--actived')
  })
  $tabPanels.forEach(($panel, idx) => {
    $panel.classList[idx === 0 ? 'add' : 'remove']('doc-panel--actived')
  })
  // 将收集到的实例全部销毁，防止内存累积
  window.instances.forEach(instance => {
    // 销毁native实例
    instance.destroy && instance.destroy()
    // 销毁vue实例
    instance.$destroy && instance.$destroy()
  })
  window.instances.length = 0
  window.scrollTo(0, 0)
}


export const router = new Router(routerChange)

router
  .set('/')
  .set('/icon', setPage({
    native: Icon
  }, 'Icon', genIconsTpl))
  .set('/button', setPage({
    native: Button
  }, 'Button'))
  .set('/input', setPage({
    native: Input
  }, 'Input', runScript))
  .set('/checkbox', setPage({
    native: Checkbox,
    vue: CheckboxVue
  }, 'Checkbox', runScript))
  .set('/radio', setPage({
    native: Radio,
    vue: RadioVue
  }, 'Radio', runScript))
  .set('/switch', setPage({
    native: Switch,
    vue: SwitchVue
  }, 'Switch', runScript))
  .set('/breadcrumb', setPage({
    native: Breadcrumb,
   
  }, 'Breadcrumb', runScript))
  .set('/badge', setPage({
    native: Badge
  }, 'Badge'))
  .set('/modal', setPage({
    native: Modal,
    vue: ModalVue
  }, 'Modal', runScript))
  .set('/alert', setPage({
    native: Alert,
    vue: AlertVue
  }, 'Alert', runScript))
  .set('/message', setPage({
    native: Message,
    vue: MessageVue
  }, 'Message', runScript))
  .set('/message-box', setPage({
    native: MessageBox,
    vue: MessageBoxVue
  }, 'MessageBox', runScript))
  .set('/popover', setPage({
    native: Popover,
    vue: PopoverVue
  }, 'Popover', runScript))
  .set('/input-number', setPage({
    native: InputNumber,
    vue: InputNumberVue
  }, 'InputNumber', runScript))
  .set('/table', setPage({
    native: Table,
  }, 'Table', runScript))
  .set('/tree', setPage({
    native: Tree,
    vue: TreeVue
  }, 'Tree', runScript))
  .set('/select', setPage({
    native: Select,
    vue: SelectVue
  }, 'Select', runScript))
  .set('/pagination', setPage({
    native: Pagination,
    vue: PaginationVue
  }, 'Pagination', runScript))
  .set('/slider', setPage({
    native: Slider,
    vue: SliderVue
  }, 'Slider', runScript))
  .set('/tag', setPage({
    native: Tag,
    vue: TagVue
  }, 'Tag', runScript))
  .init()



// events 
document.addEventListener('click', function (e) {
  var target = e.target
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