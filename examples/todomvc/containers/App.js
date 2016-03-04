'use strict'

import React from 'react'
//import {Input} from 'antd'
import Input from '../components/Input'
//import Selector from '../components/Selector'
//import CascadeSelector from './components/CascadeSelector'
//import Button from './components/Button'
//import Table from './components/Table'
//import SearchForm from './components/SearchForm'

import Page from './components/Page

import {Cicada} from 'react-cicada'

const cicada = new Cicada

// component map
const componets = {
  Input
  //Selector,
  //CascadeSelector,
  //Button,
  //Table,
  //SearchForm,
}

// dataSource map
const dataSources = {
  'gateway' : {

  }
}

// value expression map
const valueExpressions = {
  'template' : {

  }
}


// register resources
for( let componentName, componentInst of components ){
  cicada.register('component', componentName, componentInst )
}

for( let dataSourceName, dataSourceInst of dataSources ){
  cicada.register('dataSource', dataSourceName, dataSourceInst )
}

for( let valueExpressionName, valueExpressionInst of valueExpressions ){
  cicada.register('dataSource', valueExpressionName, valueExpressionInst )
}

export default cacida.build(Page)