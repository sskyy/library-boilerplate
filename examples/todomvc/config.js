export default {
  children : [{
    type : 'Input',
    id : 'name'
  },{
    type : 'Selector',
    id : 'country',
    dataSource : {
      type : 'gateway',
      id : '/country',
      query : `
        query getCountry{
          country : {
            id,
            name
          }
        }
      `
    },
    children : [
      {
        type : 'Selector',
        id : 'country-children',
        dataSource : {
          type : 'gateway',
          id : '/province',
          query : `
            query getProvince{
              province(country:$country){
                id,
                name
              }
            }
          `
        },
        props : {
          options : '$this.dataSource'
        },
      }
    ],
    props : {
      options : '$this.dataSource'
    }
  },{
    type : 'Selector',
    id : 'province',
    //dataSource : {
    //  type : 'gateway',
    //  id : '/province',
    //  query : `
    //    query getProvince{
    //      province(country:$country){
    //        id,
    //        name
    //      }
    //    }
    //  `
    //},
    props : {
      options : '$this.dataSource'
    },
  },{
    type : 'Button',
    listeners : {
      onClick : [
        {
          type : 'dataSource.query',
          target : 'userList'
        }
      ]
    }
  },{
    type : 'Table',
    id: 'userList',
    //dataSource : {
    //  type : 'gateway',
    //  id : '/users',
    //  query : `
    //    query users{
    //      users(country:$country, province:$province, name:$name):{
    //        id,
    //        name
    //      }
    //    }
    //  `
    //},
    props : {
      columns : [{
        name : '姓名',
        index: 'name'
      },{
        name : 'id',
        index : 'id'
      }],
      dataSource : '$this.dataSource'
    }
  }]
}