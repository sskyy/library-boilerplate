
import React from 'react'
import {compose} from 'react-compose'

/*
 dataSource type :  inherit | global | http | const
 */

export default compose({
  children : [{
    type : 'Selector',
    //声明 id, 就可以获得组件的数据
    id : 'country',
    dataSource : {
      type : 'http',
      url : '/api/country',
    }
  },{
    type : 'Selector',
    id : 'province',
    observe : 'country',
    dataSource : {
      type : 'http',
      url : '/api/province',
      parameters : {
        country : '$country'
      }
    }
  },{
    type : 'Selector',
    id : 'city',
    observe : 'province',
    dataSource : {
      type : 'http',
      url : '/api/city',
      parameters : {
        country : '$country',
        province : '$province',
      }
    }
  },{
    type : 'Button',
    listeners : {
      onClick : [
        {
          type : 'dataApi',
          url : '/api/getUsers',
          parameters : {
            country : '$country',
            province : '$province',
            city : '$city',
          }
        }
      ]
    }
  }]
})
