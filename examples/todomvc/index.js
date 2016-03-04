import React from 'react'
import { render } from 'react-dom'
import cicadaRender from 'react-cicada'

import config from './config'

const componentMap = {}

render(

  cicadaRender(config, componentMap),
  document.getElementById('root')
)


//register component map
