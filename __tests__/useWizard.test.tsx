import React from 'react';
import { render, fireEvent, cleanup, waitForElement, act } from 'react-testing-library';
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect';

import { useWizard } from '../src/';

describe('Wizard Hook', () => {
  const Wizard = ({ children, ...rest }) => children(useWizard(rest));

  function setup(props = {}) {
    const returnVal = {};
    render(
      <Wizard {...props}>
        {(val: any) => {
          Object.assign(returnVal, val);
          return null;
        }}
      </Wizard>
    );
    return returnVal;
  }

  afterEach(cleanup);

  it('moves to the next step', () => {
    const wizardData = setup();
    expect(wizardData.index).toBe(0);
    act(() => wizardData.nextStep());
    expect(wizardData.index).toBe(1);
  });

  it('moves to the previous step', () => {
    const wizardData = setup({ size: 5 });
    expect(wizardData.index).toBe(0);
    wizardData.nextStep();
    wizardData.nextStep();
    expect(wizardData.index).toBe(2);
    wizardData.prevStep();
    expect(wizardData.index).toBe(1);
  });

  it('Does not decrease index below 0', () => {
    const wizardData = setup();
    expect(wizardData.index).toBe(0);
    wizardData.prevStep();
    expect(wizardData.index).toBe(0);
  });

  it('Does not increase index above size', () => {
    const wizardData = setup({ size: 3 });
    expect(wizardData.index).toBe(0);
    wizardData.nextStep();
    wizardData.nextStep();
    wizardData.nextStep();
    wizardData.nextStep();
    wizardData.nextStep();
    // Zero-based index means last index is 2
    expect(wizardData.index).toBe(2);
  });

  it('sets initial values', () => {
    const initialValues = {
      foo: 'Bippety',
      bar: 3,
      baz: () => {}
    };

    const wizardData = setup({ initialValues });
    expect(JSON.stringify(wizardData.values)).toBe(JSON.stringify(initialValues));
  });

  it('changes values', () => {
    const initialValues = {
      foo: 'Bippety',
      bar: 3,
      baz: () => {}
    };

    const wizardData = setup({ initialValues });
    wizardData.onChangeValue('bar', 100);
    expect(JSON.stringify(wizardData.values)).toBe(JSON.stringify({ ...initialValues, bar: 100 }));
  });

  it('submits values', () => {
    const initialValues = {
      foo: 'Bippety',
      bar: 3,
      baz: () => {}
    };

    const onSubmit = args => {
      expect(JSON.stringify(wizardData.values)).toBe(JSON.stringify(args));
    }

    const wizardData = setup({ initialValues, onSubmit });
    
    wizardData.onSubmit();
    
  })
});
