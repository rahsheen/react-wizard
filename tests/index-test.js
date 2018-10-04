import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Wizard from 'src/'

describe('Wizard', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<Wizard><Wizard.Step>{() => <h2>>@rahsheen/React-Wizard</h2>}</Wizard.Step></Wizard>, node, () => {
      expect(node.innerHTML).toContain('React-Wizard')
    })
  }) 
})
