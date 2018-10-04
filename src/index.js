import React, {Component} from 'react'
import Wizard from './Wizard'

export default class extends Component {
  render() {
    return <Wizard>
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
    </Wizard>
  }
}
