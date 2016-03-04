import {forEach, mapValues} from './util'
import assign from 'object-assign'

import {HookContainer} from './Container'
import {ReduxContext} from './Context'


//////////////////////////////////////////////////
//   Walker : traverse the configuration object
//////////////////////////////////////////////////

export class Walker {
  constructor(consumers, Context) {
    this.consumers = consumers
    this.Context = Context
  }

  compile(config, parentContext) {
    const output = {}
    const isRoot = (parentContext === undefined)
    const rootContext = isRoot ? new this.Context : null

    if( isRoot ) rootContext.open()

    // 1. call consumers
    const context = isRoot ? rootContext.fork(config) : parentContext.fork(config)
    const consumerResult = this.callConsumer(config, context)
    assign(output, consumerResult)

    // 2. iterate children
    if (config.children !== undefined) {
      output.children = config.children.map(child=> {
        return this.compile(child, context)
      })
    }

    if (isRoot){
      rootContext.close()
      output.context = rootContext
    }

    return output
  }

  callConsumer(config, context) {
    // TODO props overwrite?
    const result = {
      ...config,
      hooks: new HookContainer()
    }

    this.consumers.forEach(consumer=> {
      consumer(config, context, result)
    })
    return result
  }
}

////////////////////////
//    Redux Walker
////////////////////////

function RxToRedux(config){
  const transformed = {...config}
  if( transformed.id !== undefined ){
    // 1. create InitialState
    if( transformed.initialState === undefined ){
      transformed.initialState = {}
    }
    if( transformed.subscribe === undefined ){
      transformed.subscribe = []
    }

    transformed.initialState[transformed.id] = {}
    transformed.subscribe.push(transformed.id)
  }
  return transformed
}


export  class ReduxWalker extends Walker {
  constructor(consumers) {
    super(consumers, ReduxContext)
  }
  compile( config, parentContext ){
    return super.compile(RxToRedux(config), parentContext)
  }
}