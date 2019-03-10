import * as React from "react"
import useWizard from "../hooks/useWizard"
import Step, { StepProps } from "./Step"

export interface WizardProps {
  steps?: any
  children?: any
  initialValues?: object
  onSubmit?: (values: object) => any
}

const WizardContext = React.createContext(null)

const Wizard = (props: WizardProps) => {
  const { children, steps, initialValues } = props

  if (!(children || steps)) return null

  const enabledSteps = React.Children.toArray([steps, children]).filter(
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

  const value = React.useMemo(
    () => ({
      currentIndex: index,
      prevStep,
      nextStep,
      onChangeValue,
      onSubmit,
      values,
      isLast: index === enabledSteps.length - 1
    }),
    [index]
  )

  const activeStep = enabledSteps[index]

  return Boolean(activeStep) ? (
    <WizardContext.Provider value={value}>{activeStep}</WizardContext.Provider>
  ) : null
}

function useWizardContext() {
  const context = React.useContext(WizardContext)

  if (!context) {
    throw new Error(
      `Wizard compound components cannot be rendered outside the Wizard component`
    )
  }
  return context
}

Wizard.Step = (props: StepProps) => <Step {...useWizardContext()} {...props} />

export default Wizard
