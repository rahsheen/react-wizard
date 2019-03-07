export interface StepProps {
  children: any
}

const Step = (props: StepProps) => {
  const { children, ...rest } = props

  return children({ ...rest })
}

export default Step
