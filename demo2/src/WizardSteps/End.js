import React from 'react'

export default function Step4(props) {
  let wrong = 2
  let finalScore = ((10 - wrong) / 10) * 100
  let message = final => {
    switch (final) {
      case 100:
      case 90:
      case 80:
        return 'You know your Wizards!'
        break
      case 70:
      case 60:
        return 'Not bad, but not good either.'
        break
      case 50:
        return "You really didn't know what this quiz was about, did you."
        break
      default:
        return 'Thanks!'
    }
  }
  return (
    <div className="qContainer">
      <img src={props.image} style={{ height: 200, width: 250, padding: 50 }} />
      <p>Your Final score was {finalScore}%</p>
      <p style={{ padding: 20 }}>{message(finalScore)}</p>
      <div className="bContainer">
        <button onClick={props.prevStep}>Back</button>
        <button onClick={props.submit}>Finish</button>
      </div>
    </div>
  )
}
