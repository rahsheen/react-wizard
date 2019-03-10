export interface StepProps {
  children: (props: any) => React.ReactElement
  nextStep?: () => void
  prevStep?: () => void
  currentIndex?: number
  onChangeValue?: (name: string, value: string) => void
  onSubmit?: () => void
  values?: {}
  disabled?: boolean
}

const Step = ({ children, ...rest }: StepProps) => {
  return children({ ...rest })
}

export default Step
