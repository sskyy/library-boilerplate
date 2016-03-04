const INIT_ACTION = '@@redux/INIT'
import {ReducerContainer} from './Container'
import {createStore, combineReducers} from 'redux'
import {intersection, forEach} from './util'
import assign from 'object-assign'



//////////////////////////////////////////////////
//   Context : provide context to walker consumer
//////////////////////////////////////////////////


export class Context {
  fork() {
    throw new Error('Implement your own walker context.')
  }

  open() {
    throw new Error('Implement your own walker context.')
  }

  close() {
    throw new Error('Implement your own walker context.')
  }
}



export class ReduxContext extends Context {
  open() {
    this.initialState = {}
    this.reducers = new ReducerContainer()
  }

  fork(config) {
    this.initializeStoreState(config)

    // TODO return new context
    return this
  }

  initializeStoreState(config) {

    if (config.initialState === undefined) return

    const conflictName =  intersection(Object.keys(config.initialState), Object.keys(this.initialState))
    if( conflictName.length > 0 ){
      throw new Error(`new initial state name conflict: ${conflictName.toString()}`)
    }

    assign(this.initialState, config.initialState)

    // every store state need a default reducer, or redux may throw warning
    forEach( config.initialState, (defaultValue, name)=>{
      this.reducers.add(name, INIT_ACTION, function(){
        //TODO how to calculate dependency
        return defaultValue
      })
    })
  }

  close() {
    this.store = createStore(this.reducers.generate(), this.initialState)

    // TODO debug
    window.store = this.store
    window.context = this
  }
}