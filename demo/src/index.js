import React, { Component } from "react";
import { render } from "react-dom";
import Wizard from "../../src/";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>@rahsheen/React-Wizard Demo</h1>
        <Wizard>
          <Wizard.Step>
            {({ nextStep, prevStep }) => {
              return (
                <div>
                  <h2>Foo</h2>
                  <button onClick={prevStep}>Back</button>
                  <button onClick={nextStep}>Next</button>
                </div>
              );
            }}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep }) => (
              <div>
                <h2>Bar</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
          <Wizard.Step>
            {({ nextStep, prevStep }) => (
              <div>
                <h2>Baz</h2>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            )}
          </Wizard.Step>
        </Wizard>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
