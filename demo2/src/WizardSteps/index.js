import React from 'react'
import Wizard from '@rahsheen/react-wizard'
import Start from './Start'
import Single from './SingleAnswer'
import Multi from './MultiAnswer'
import End from './End'
// import potter from '../../potter.json'

const QUIZ = name => JSON.parse(JSON.stringify(require(`../../${name}`)))
const IMG = [
  require('../assets/Hogwarts1.jpeg'),
  require('../assets/bday.gif'),
  require('../assets/HarryPotter_1.jpg'),
  require('../assets/potions.jpg'),
  require('../assets/Harry-Potter-Cake.jpg'),
  require('../assets/book-shop.jpg'),
  require('../assets/lockhart.jpg'),
  require('../assets/owl-exam.gif'),
  require('../assets/ouchies.jpg'),
  require('../assets/marge.jpg'),
  require('../assets/sirius.jpg'),
  require('../assets/noname.gif')
]
const STEPS = [
  Start,
  Single,
  Single,
  Multi,
  Single,
  Single,
  Single,
  Single,
  Multi,
  Single,
  Single,
  End
]
export default function WizardSteps(props) {
  const quiz = QUIZ('potter.json') // create a quiz and load it here...

  return (
    <Wizard>
      {STEPS.map((Quiz, i) => (
        <Wizard.Step key={i}>
          {({ nextStep, prevStep }) => (
            <Quiz
              nextStep={nextStep}
              prevStep={prevStep}
              image={IMG[i]}
              quiz={quiz[i - 1]}
            />
          )}
        </Wizard.Step>
      ))}
    </Wizard>
  )
}
