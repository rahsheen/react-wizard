import * as React from "react"
import useWizard from "../hooks/useWizard"
import Step from "./Step"

export interface WizardProps {
  children: any
  initialValues: object
  onSubmit: (values: object) => any
}

const Wizard = (props: WizardProps) => {
  const { children, initialValues } = props

  if (!children) return null

  const enabledSteps = React.Children.toArray(children).filter(
    child => !child.props.disabled
  )

  const {
    nextStep,
    prevStep,
    index,
    onChangeValue,
    onSubmit,
    values
  } = useWizard({
    initialValues,
    size: enabledSteps.length,
    onSubmit: props.onSubmit
  })

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

//@ts-ignore
Wizard.Step = (props: any) => <Step {...props} />

export default Wizard
