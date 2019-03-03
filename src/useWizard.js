import { useState } from "react"

function useWizard(initialValues, size, onSubmitWizard) {
  const [index, setStep] = useState(0)
  const [values, setValues] = useState({ ...initialValues })

  const onSubmit = () => {
    onSubmitWizard(values)
  }

  const prevStep = () => {
    if (index <= 0) return
    setStep(index - 1)
  }

  const nextStep = () => {
    if (index >= size - 1) return
    setStep(index + 1)
  }

  const onChangeValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  }

  return {
    nextStep,
    prevStep,
    index,
    onChangeValue,
    onSubmit,
    values
  }
}

export default useWizard
