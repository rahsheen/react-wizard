import expect from "expect"
import React from "react"
import { render, unmountComponentAtNode } from "react-dom"

import { useWizard } from "src/"

describe("Wizard Hook", () => {
  let node

  const Wizard = ({ children, ...rest }) => children(useWizard(rest))

  function setup(props = {}) {
    const returnVal = {}
    render(
      <Wizard {...props}>
        {val => {
          Object.assign(returnVal, val)
          return null
        }}
      </Wizard>,
      node
    )
    return returnVal
  }

  beforeEach(() => {
    node = document.createElement("div")
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it("moves to the next step", () => {
    const wizardData = setup()
    expect(wizardData.index).toBe(0)
    wizardData.nextStep()
    expect(wizardData.index).toBe(1)
  })

  it("moves to the previous step", () => {
    const wizardData = setup({ size: 5 })
    expect(wizardData.index).toBe(0)
    wizardData.nextStep()
    wizardData.nextStep()
    expect(wizardData.index).toBe(2)
    wizardData.prevStep()
    expect(wizardData.index).toBe(1)
  })

  it("Does not decrease index below 0", () => {
    const wizardData = setup()
    expect(wizardData.index).toBe(0)
    wizardData.prevStep()
    expect(wizardData.index).toBe(0)
  })

  it("Does not increase index above size", () => {
    const wizardData = setup({ size: 3 })
    expect(wizardData.index).toBe(0)
    wizardData.nextStep()
    wizardData.nextStep()
    wizardData.nextStep()
    wizardData.nextStep()
    wizardData.nextStep()
    // Zero-based index means last index is 2
    expect(wizardData.index).toBe(2)
  })

  it("sets initial values", () => {
    const initialValues = {
      foo: "Bippety",
      bar: 3,
      baz: () => {}
    }

    const wizardData = setup({ initialValues })
    expect(wizardData.values).toBe(initialValues)
  })

  it("changes values", () => {})
  it("sets initial values", () => {})
})
