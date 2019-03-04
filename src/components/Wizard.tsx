import * as React from 'react';
import useWizard from '../hooks/useWizard';
import Step from './Step';

interface WizardProps {
  children: any;
  initialValues: object;
  onSubmit: (values: object) => any;
}

const Wizard = (props: WizardProps) => {
  const { children, initialValues } = props;

  if (!children) return null;
  
  const enabledSteps = React.Children.toArray(children).filter(child => !child.props.disabled);
  
  console.log(`The steps are`, enabledSteps)
  const { nextStep, prevStep, index, onChangeValue, onSubmit, values } = useWizard({
    initialValues,
    size: enabledSteps.length,
    onSubmit: props.onSubmit
  });

  let currentElement = enabledSteps[index];

  return Boolean(currentElement)
    ? React.cloneElement(currentElement, {
        currentIndex: index,prevStep,
        nextStep,
        onChangeValue,
        onSubmit,
        values,
        isLast: index === children.length - 1
      })
    : <h3>Oh Shit!</h3>;
};

//@ts-ignore
Wizard.Step = (props: any) => <Step {...props} />;

export default Wizard;
