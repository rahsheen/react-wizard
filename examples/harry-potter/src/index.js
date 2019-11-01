import React from 'react'
import ReactDOM from 'react-dom'
import WizardSteps from './WizardSteps'
import './styles.css'

function App() {
  return (
    <div className="App">
      <h3>Wizard Quiz: Harry Potter</h3>
      <WizardSteps />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
