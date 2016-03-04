import React from 'react'
import {Provider, connect} from 'react-redux'
import {zip} from './util'

export  class ReduxBuilder{
  constructor( componentMap){
    this.map = componentMap
  }
  createReactClass(config){

    // notice, component Class should be create outside render method.
    const Children = config.children?config.children.map(
      child=>this.createReduxConnectClass(child)
    ):[]

    const ReactClass = React.createClass({
      ...config.hooks.generate(),
      render(){
        const self = this
        return <div className='cicada-component'>
          <h1>Type:{config.type||'Cicada'}</h1>

          <h2>props:</h2>
          {self.props?Object.keys(self.props).map((key, index)=>{
            if( typeof self.props[key]!=='function'){
              return <div key={index}>{key}:{JSON.stringify(self.props[key])}</div>
            }else{
              return null
            }
          }):null}

          <h2>children:</h2>
          {Children.map((Child,index)=><Child key={index} />)}
        </div>
      }
    })

    return ReactClass

  }
  createReduxConnectClass(config){

    const ChildReactClass = this.createReactClass(config)

    if( config.subscribe === undefined ) return ChildReactClass

    // bind props
    // TODO allow multiple map function!!!!!!!!!!!!!!!!!!!!!!!!!
    const mapStateToProps = (state)=>{
      return zip(
        config.subscribe,
        config.subscribe.map(name=>state[name])
      )
    }

    return connect(mapStateToProps)(ChildReactClass)
  }
  render(config){
    const Child = this.createReduxConnectClass(config)

    console.log( config)
    return <Provider store={config.context.store}>
      <div>
        <Child />
      </div>
    </Provider>
  }
}