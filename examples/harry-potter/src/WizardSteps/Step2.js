import React from 'react'

export default function Step2(props) {
  let _answers = []
  for (let key in props.quiz.answers) {
    _answers.push(key)
  }
  return (
    <div className="qContainer">
      <h3 style={{ width: '300px' }}>{props.quiz.clue}</h3>
      <div>
        <ul>{_answers.map((answer, i) => <li key={i}>{answer}</li>)}</ul>
      </div>
      <div className="bContainer">
        <button onClick={props.prevStep}>Back</button>
        <button onClick={props.nextStep}>Next</button>
      </div>
    </div>
  )
}
