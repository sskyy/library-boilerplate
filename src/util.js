export function forEach( obj, fn ){
  return Object.keys( obj ).forEach(key=>{
    return fn( obj[key], key)
  })
}


export function compose( fnA, fnB){
  return function( ...arg){
    fnA && fnA(...arg)
    fnB && fnB(...arg)
  }
}

export function mapValues(obj, handler){
  const result = {}
  Object.keys( obj).forEach(key=>{
    result[key] = handler(obj[key], key)
  })
  return result
}

export function intersection( ...arrays ){
  let result= []
  arrays[0].forEach(item=>{
    if( arrays[1].indexOf(item) !== -1 ){
      result.push(item)
    }
  })
  if( arrays.length > 2 ){
    result =  intersection(result, ...arrays.slice(2) )
  }
  return result
}

export function zip( keys, values ){
  const result = {}
  keys.forEach( (key, index)=>{
    result[key] = values[index]
  })
  return result
}