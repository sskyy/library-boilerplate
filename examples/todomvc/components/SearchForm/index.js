
import React from 'react'
import {compose} from 'react-compose'

/*
 dataSource type :  inherit | global | http | const
 */

export default compose({
  children : [{
    type : 'CascadeSelector',
    id : 'location',
    dataSource : {
      type : 'http',
      url : '/api/country',
    }
  },{
    type : 'Button',
    listeners : {
      onClick : [
        // 这是自动方式
        {
          type : 'dataApi',
          api : 'getUsers',
          variable : 'result',
          parameters : {
            country : '$location.country',
            province : '$location.province',
            city : '$location.city',
          },
          query : `user(id:123123,limit:1) {
              id,
              name,
              age,
              friends : user(id:){

              }
          }`
        },
        // 这是手动方式
        //{
        //  type : 'reducer',
        //  target : 'users',
        //  fn : function(state, country, province){
        //    return await getUsers( country, province )
        //  }
        //},
      ]
    }
  }]
})
