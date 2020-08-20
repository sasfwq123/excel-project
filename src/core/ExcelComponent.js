/* eslint-disable */
import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = [] // new

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  $emit(event, ...args) { // new
    this.emitter.emit(event, ...args)
  }

  $on(event, func) { // new
    const unsub = this.emitter.subscribe(event, func)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub()) // new
  }
}
