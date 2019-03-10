import React, { Component } from "react"
import { render } from "react-dom"
import { Wizard } from "../../src"

class App extends Component {
  render() {
    const steps = [1, 2, 3].map(index => (
      <Wizard.Step>
        {({ nextStep, prevStep, onSubmit, currentIndex }) => (
          <div>
            <h2>Step {currentIndex} From Array</h2>
            <button onClick={prevStep}>prev</button>
            <button onClick={nextStep}>next</button>
            <button onClick={onSubmit}>submit</button>
          </div>
        )}
      </Wizard.Step>
    ))

    return (
      <div>
        <h1>@rahsheen/React-Wizard Demo</h1>
        <Wizard>
          <Wizard.Step>
            {({ nextStep, prevStep, currentIndex }) => {
              return (
                <div>
                  <h2>Foo {currentIndex}</h2>
                  <button onClick={prevStep}>Back</button>
                  <button onClick={nextStep}>Next</button>
                </div>
              )
            }}
          </Wizard.Step>
          <div>
            <Wizard.Step>
              {({ nextStep, prevStep, currentIndex }) => (
                <div>
                  <h2>Bar {currentIndex}</h2>
                  <button onClick={prevStep}>Back</button>
                  <button onClick={nextStep}>Next</button>
                </div>
              )}
            </Wizard.Step>
          </div>
          <Wizard.Step disabled>
            {({ nextStep, prevStep, currentIndex }) => (
              <div>
                <h2>Bip {currentIndex}</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep, currentIndex }) => (
              <div>
                <h2>Baz {currentIndex}</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep, currentIndex }) => {
              return (
                <div>
                  <h2>Foo {currentIndex}</h2>
                  <button onClick={prevStep}>Back</button>
                  <button onClick={nextStep}>Next</button>
                </div>
              )
            }}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep, currentIndex }) => (
              <div>
                <h2>Bar {currentIndex}</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep, currentIndex }) => (
              <div>
                <h2>Bip {currentIndex}</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep, currentIndex }) => (
              <div>
                <h2>Baz {currentIndex}</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
        </Wizard>
        <h1>@rahsheen/React-Wizard Array Demo</h1>

        <Wizard steps={steps} />
        <h1>@rahsheen/React-Wizard Array+JSX Demo</h1>

        <Wizard steps={steps}>
          {[1, 2, 3].map(index => (
            <Wizard.Step>
              {({ nextStep, prevStep, onSubmit, currentIndex }) => (
                <div>
                  <h2>Step {currentIndex} From JSX</h2>
                  <button onClick={prevStep}>prev</button>
                  <button onClick={nextStep}>next</button>
                  <button onClick={onSubmit}>submit</button>
                </div>
              )}
            </Wizard.Step>
          ))}
        </Wizard>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"))
