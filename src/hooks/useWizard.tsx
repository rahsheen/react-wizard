import { useState } from "react"

function useWizard({
  initialValues = {},
  size = 2,
  onSubmit: onSubmitWizard = ({}): any => {}
} = {}) {
  const [index, setIndex] = useState(0)
  const [values, setValues] = useState({ ...initialValues })

  const onSubmit = () => {
    onSubmitWizard(values)
  }

  const prevStep = () => {
    if (index <= 0) return
    setIndex(index - 1)
  }

  const nextStep = () => {
    if (index >= size - 1) return
    setIndex(index + 1)
  }

  const onChangeValue = (name: string, value: string) => {
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
