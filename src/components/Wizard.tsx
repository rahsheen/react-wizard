import * as React from "react"
import useWizard from "../hooks/useWizard"
import Step from "./Step"

export interface WizardProps {
  children: any
  initialValues: object
  onSubmit: (values: object) => any
}

const WizardContext = React.createContext(null)

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

  const currentElement = enabledSteps[index]
  const value = React.useMemo(
    () => ({
      currentIndex: index,
      prevStep,
      nextStep,
      onChangeValue,
      onSubmit,
      values,
      isLast: index === children.length - 1
    }),
    [index]
  )

  return Boolean(currentElement) ? (
    <WizardContext.Provider value={value}>
      {currentElement}
    </WizardContext.Provider>
  ) : null
}

function useWizardContext() {
  const context = React.useContext(WizardContext)
  console.log("Dafuq", context)
  if (!context) {
    throw new Error(
      `Wizard compound components cannot be rendered outside the Wizard component`
    )
  }
  return context
}

Wizard.Step = (props: any) => <Step {...useWizardContext()} {...props} />

export default Wizard
