import { combineReducers} from 'redux'
import {mapValues} from './util'

///////////////////////////////////////////
//   Container : used to concat functions
///////////////////////////////////////////

export class Container{
  constructor(){
    this.data = {}
  }
  add( hookName, ...args){
    if( this.data[hookName] === undefined  ) this.data[hookName] = []
    this.data[hookName].push(args)
  }
  generate(){}
}


export class ReducerContainer extends Container{
  generate() {
    // TODO  support multi level reducer
    return combineReducers(mapValues(this.data, (actionHandlerPairs)=> {

      // TODO do we need store.getState()?
      return function (state, action) {
        let outputResult = state || {}
        actionHandlerPairs.forEach(([actionType, handler])=> {
          if ((typeof actionType === 'string' && action.type === actionType )
            || ( typeof actionType === 'function' && actionType(action) )) {
            outputResult = handler(state, action, outputResult)
          } else {
            // TODO log?
          }
        })

        return {...state, ...outputResult}
      }
    }))
  }
}


export class HookContainer extends Container{
  generate(){
    return mapValues(this.data, handlerPairs=>{
      return function(...args){
        //debugger
        handlerPairs && handlerPairs.forEach(([handler])=>{
          handler.call(this,...args)
        })
      }
    })
  }
}