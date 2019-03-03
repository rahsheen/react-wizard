import expect from "expect"
import React from "react"
import { render, unmountComponentAtNode } from "react-dom"

import { Wizard } from "src/"

describe("Wizard", () => {
  let node

  beforeEach(() => {
    node = document.createElement("div")
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it("displays a welcome message", () => {
    render(
      <Wizard>
        <Wizard.Step>{() => <h2>>@rahsheen/React-Wizard</h2>}</Wizard.Step>
      </Wizard>,
      node,
      () => {
        expect(node.innerHTML).toContain("React-Wizard")
      }
    )
  })

  it("does not render without children", () => {
    render(<Wizard />, node, () => {
      expect(node.children.length).toBe(0)
    })
  })

  it("does not render future steps", () => {
    const structure = (
      <Wizard>
        <Wizard.Step>{() => <h2>>@rahsheen/React-Wizard</h2>}</Wizard.Step>
        <Wizard.Step>{() => <h2>Step 2</h2>}</Wizard.Step>
      </Wizard>
    )
    render(structure, node, () => {
      expect(node.innerHTML).toNotContain("Step 2")
    })
  })
})
