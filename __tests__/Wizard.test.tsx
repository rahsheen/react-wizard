import React from "react"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library"
// adds special assertions like toHaveTextContent
import "jest-dom/extend-expect"

import { Wizard } from "../src/"

const TestComponent = (props?: any) => (
  <Wizard {...props}>
    <Wizard.Step>
      {({ nextStep, prevStep, onChangeValue }) => (
        <div>
          <h2>Step 1</h2>
          <input
            type="text"
            data-testid="textbox"
            value=""
            onChange={e => onChangeValue("testText", e.target.value)}
          />
          <button onClick={prevStep}>prev</button>
          <button onClick={nextStep}>next</button>
        </div>
      )}
    </Wizard.Step>
    <Wizard.Step>
      {({ nextStep, prevStep }) => (
        <div>
          <h2>Step 2</h2>
          <button onClick={prevStep}>prev</button>
          <button onClick={nextStep}>next</button>
        </div>
      )}
    </Wizard.Step>
    <Wizard.Step>
      {({ nextStep, prevStep, onSubmit }) => (
        <div>
          <h2>Step 3</h2>
          <button onClick={prevStep}>prev</button>
          <button onClick={nextStep}>next</button>
          <button onClick={onSubmit}>submit</button>
        </div>
      )}
    </Wizard.Step>
  </Wizard>
)

const steps = [1, 2, 3].map(index => (
  <Wizard.Step>
    {({ nextStep, prevStep, onSubmit }) => (
      <div>
        <h2>Step {index}</h2>
        <button onClick={prevStep}>prev</button>
        <button onClick={nextStep}>next</button>
        <button onClick={onSubmit}>submit</button>
      </div>
    )}
  </Wizard.Step>
))

describe("Wizard Component", () => {
  afterEach(cleanup)

  it("renders", () => {
    const { getByText } = render(
      <Wizard initialValues={{}} onSubmit={null}>
        <Wizard.Step>{() => <h2>@rahsheen/React-Wizard</h2>}</Wizard.Step>
      </Wizard>
    )

    expect(getByText("@rahsheen/React-Wizard"))
  })

  it("does not render without children", () => {
    // @ts-ignore
    const { container } = render(<Wizard initialValues={{}} onSubmit={null} />)
    expect(container.childElementCount).toBe(0)
  })

  xit("renders steps from array", async () => {
    const { getByText } = render(
      <Wizard initialValues={{}} onSubmit={null} steps={steps} />
    )
    await waitForElement(() => getByText(/Step/i))
    fireEvent.click(getByText(/next/i))
    await waitForElement(() => getByText(/Step 2/i))
    fireEvent.click(getByText(/next/i))
    await waitForElement(() => getByText(/Step 3/i))
  })

  it("doesn't render disabled steps", () => {
    const { container } = render(
      <Wizard initialValues={{}} onSubmit={null}>
        <Wizard.Step>{() => <h2>rahsheen/React-Wizard</h2>}</Wizard.Step>
        <Wizard.Step disabled={true}>{() => <h2>Step 2</h2>}</Wizard.Step>
      </Wizard>
    )

    expect(container.childElementCount).toBe(1)
  })

  it("does not render future steps", () => {
    const { container } = render(
      <Wizard initialValues={{}} onSubmit={null}>
        <Wizard.Step>{() => <h2>rahsheen/React-Wizard</h2>}</Wizard.Step>
        <Wizard.Step>{() => <h2>Step 2</h2>}</Wizard.Step>
      </Wizard>
    )

    expect(container.childElementCount).toBe(1)
  })

  it("moves to the next step", async () => {
    const { getByText } = render(TestComponent())
    await waitForElement(() => getByText(/Step 1/i))
    fireEvent.click(getByText(/next/i))
    await waitForElement(() => getByText(/Step 2/i))
  })

  it("moves to the previous step", async () => {
    const { getByText } = render(TestComponent())
    await waitForElement(() => getByText(/Step 1/i))
    fireEvent.click(getByText(/next/i))
    await waitForElement(() => getByText(/Step 2/i))
    fireEvent.click(getByText(/prev/i))
    await waitForElement(() => getByText(/Step 1/i))
  })

  it("does not step back before first step", async () => {
    const { getByText } = render(TestComponent())
    await waitForElement(() => getByText(/Step 1/i))
    fireEvent.click(getByText(/prev/i))
    fireEvent.click(getByText(/prev/i))
    fireEvent.click(getByText(/prev/i))
    await waitForElement(() => getByText(/Step 1/i))
  })

  it("does not past last step", async () => {
    const { getByText } = render(TestComponent())
    await waitForElement(() => getByText(/Step 1/i))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/next/i))
    await waitForElement(() => getByText(/Step 3/i))
  })

  it("submits values", () => {
    const initialValues = {
      foo: "Bippety",
      bar: 3,
      baz: () => {}
    }

    const onSubmit = jest.fn()

    const { getByText } = render(TestComponent({ initialValues, onSubmit }))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/submit/i))
    expect(onSubmit).toHaveBeenCalledWith(initialValues)
  })

  it("changes values", () => {
    const initialValues = {
      testText: "Bippety",
      bar: 3,
      baz: () => {}
    }

    const onSubmit = jest.fn()

    const { getByTestId, getByText } = render(
      TestComponent({ initialValues, onSubmit })
    )
    fireEvent.change(getByTestId("textbox"), {
      target: { value: "new-test-value" }
    })
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/next/i))
    fireEvent.click(getByText(/submit/i))
    expect(onSubmit).toHaveBeenCalledWith({
      ...initialValues,
      testText: "new-test-value"
    })
  })
})
