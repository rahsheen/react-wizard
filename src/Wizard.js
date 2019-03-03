import React from "react"
import { Step, useWizard } from "."

const Wizard = props => {
  const { children, initialValues } = props

  if (!children) return null

  const {
    nextStep,
    prevStep,
    index,
    onChangeValue,
    onSubmit,
    values
  } = useWizard({
    initialValues,
    size: children.length,
    onSubmit: props.onSubmit
  })

  const enabledSteps = React.Children.toArray(children).filter(
    child => !child.props.disabled
  )

  let currentElement = enabledSteps[index]

  return Boolean(currentElement)
    ? React.cloneElement(currentElement, {
        currentIndex: index,
        prevStep,
        nextStep,
        onChangeValue,
        onSubmit,
        values,
        isLast: index === children.length - 1
      })
    : null
}

Wizard.Step = props => <Step {...props} />

export default Wizard
