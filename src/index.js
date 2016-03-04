import assign from 'object-assign'


import {ReduxWalker} from './Walker.js'
import {ReduxBuilder} from './Builder'

import dataSource from './consumer/dataSource.js'
import listener from './consumer/listener.js'



class Cicada{
  constructor( walker, builder ){
    assign( this, {walker, builder })
  }
  render( config ){
    const compiled = this.walker.compile(config)
    return this.builder.render(  compiled )
  }
}

export default function render( config, componentMap ){
  const walker = new ReduxWalker([listener, dataSource])
  const builder = new ReduxBuilder( componentMap )
  const cicada =  new Cicada( walker, builder )
  return cicada.render( config )
}