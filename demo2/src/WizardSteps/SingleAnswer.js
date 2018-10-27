import React, { Component } from 'react'

export default class Step3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      somestatething: ''
    }
  }

  componentWillMount() {
    // todo
  }
  componentWillUnmount() {
    // todo
  }

  render() {
    let _answers = []
    for (let key in this.props.quiz.answers) {
      _answers.push(key)
    }
    return (
      <div className="qContainer">
        <img
          src={this.props.image}
          style={{ height: 200, width: 250, padding: 10 }}
        />
        <h3>{this.props.quiz.clue}</h3>

        <div>
          <ul>
            {_answers.map((answer, i) => (
              <li key={i}>
                <input type="radio" value="false" />
                <span style={{ marginLeft: '5px', marginTop: '-3px' }}>
                  {answer}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bContainer">
          <button onClick={this.props.prevStep}>Back</button>
          <button onClick={this.props.nextStep}>Next</button>
        </div>
      </div>
    )
  }
}
