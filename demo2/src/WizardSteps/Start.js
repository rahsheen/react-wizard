import React from 'react'

export default function Start(props) {
  return (
    <div className="start">
      <p>Test your knowledge!</p>
      <img src={require('../assets/Hogwarts1.jpeg')} />
      <button onClick={props.nextStep}>Start Quiz!</button>
    </div>
  )
}
