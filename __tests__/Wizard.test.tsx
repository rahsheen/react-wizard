import React from "react"
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library"
import { Wizard, useWizard } from "../src/"

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

const DefaultWizard = props => {
  const wizardProps = useWizard()
  return <div>Step {wizardProps.index}</div>
}

describe("Wizard Component", () => {
  afterEach(cleanup)

  it("uses default values", async () => {
    const { getByText } = render(<DefaultWizard />)
    await waitForElement(() => getByText(/Step/i))
  })

  it("renders", () => {
    const { getByText } = render(<TestComponent />)
    expect(getByText("Step 1"))
  })

  it("does not render without children", () => {
    const { container } = render(<Wizard />)
    expect(container.childElementCount).toBe(0)
  })

  it("throws an error if Steps are used outside of a Wizard", () => {
    expect(() =>
      render(<Wizard.Step>{() => <p>foo</p>}</Wizard.Step>)
    ).toThrow()
  })

  it("renders null if no active step found", () => {
    const { container } = render(
      <Wizard>
        <Wizard.Step disabled>{() => <p>Test</p>}</Wizard.Step>
        <Wizard.Step disabled>{() => <p>Test</p>}</Wizard.Step>
        <Wizard.Step disabled>{() => <p>Test</p>}</Wizard.Step>
      </Wizard>
    )
    expect(container.childElementCount).toBe(0)
  })

  it("renders steps from array", async () => {
    const { getByText } = render(<Wizard steps={steps} />)
    await waitForElement(() => getByText(/Step 1/i))
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
