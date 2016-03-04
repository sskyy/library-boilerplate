import React from 'react';
import {wrap} from 'react-compose';

var ACTION_CHANGE = 'ACTION_CHANGE';

export function render(props){
  return (
    <div style={{width:'200px', border:'1px #333 solid'}}>
    <div>
      <div>{props.value}</div>
      <div>下拉</div>
    </div>
    <div>
      <ul>
        {props.options.map( option=>{
          return <li onClick={props.onChange.bind(null, option)}>{option}</li>
        })}
      </ul>
    </div>
  </div>
  )
}

function reducer( {options, value}, action){
  switch(action.type){
    case ACTION_CHANGE :
      return {options, value : action.payload}
    default :
      return {options, value}
  }
}

export const mapPropsToActions = {
  onChange : ACTION_CHANGE
}


export default wrap(render, mapPropsToActions, reducer)


