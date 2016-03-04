import {compose} from '../util'

export const actions = {
  refresh : 'REFRESH'
}

export default function dataSourceConsumer( config, context, result ){
  if( config.dataSource === undefined || config.id === undefined ) return

  // TODO support multiple dataSource type

  // 1. add reducer to receive action
  context.reducers.add( config.id, actions.refresh, function( state, action, lastState ){
    const result = action.payload.target === config.id ? action.payload.data : lastState
    return result
  })

  // 2. dispatch action to refresh dataSource
  result.hooks.add('componentDidMount',function(){
    //console.log('sending dataSource ajax')
    setTimeout(()=>{
      //console.log('dataSource ajax success')
      //console.log('dispatching action to update Store')

      // TODO graphQL get data
      context.store.dispatch({
        type : actions.refresh,
        //type : "",
        payload : {
          target : config.id,
          data :{
            aaaa : config.id
          }
        }
      })
    },1)
  })



}