import React from 'react';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
// adds special assertions like toHaveTextContent
import 'jest-dom/extend-expect';

import { Wizard } from '../src/';

describe('Wizard Component', () => {
  afterEach(cleanup);

  test('displays a welcome message', () => {
    const { getByText } = render(
      <Wizard initialValues={{}} onSubmit={null}>
        <Wizard.Step>{() => <h2>@rahsheen/React-Wizard</h2>}</Wizard.Step>
      </Wizard>
    );

    expect(getByText('@rahsheen/React-Wizard'))
  });
  
  test("does not render without children", () => {
    // @ts-ignore 
    const {container} = render(<Wizard initialValues={{}} onSubmit={null}></Wizard>)
    expect(container.childElementCount).toBe(0)
  })
  
  test("doesn't render disabled steps", () => {
    const {container, getByText} = render(
      <Wizard initialValues={{}} onSubmit={null}>
        <Wizard.Step>{() => <h2>rahsheen/React-Wizard</h2>}</Wizard.Step>
        <Wizard.Step disabled={true}>{() => <h2>Step 2</h2>}</Wizard.Step>
      </Wizard>
    )

    expect(container.childElementCount).toBe(1)
  })

  test("does not render future steps", () => {
    const {container} = render(
      <Wizard initialValues={{}} onSubmit={null}>
        <Wizard.Step>{() => <h2>rahsheen/React-Wizard</h2>}</Wizard.Step>
        <Wizard.Step>{() => <h2>Step 2</h2>}</Wizard.Step>
      </Wizard>
    )

    expect(container.childElementCount).toBe(1)
  })
})