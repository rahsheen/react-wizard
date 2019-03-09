# @rahsheen/react-wizard

[![Build Status](https://travis-ci.org/rahsheen/react-wizard.svg?branch=master)](https://travis-ci.org/rahsheen/react-wizard)
![npm (scoped)](https://img.shields.io/npm/v/@rahsheen/react-wizard.svg)
[![Coverage Status](https://coveralls.io/repos/github/rahsheen/react-wizard/badge.svg?branch=master)](https://coveralls.io/github/rahsheen/react-wizard?branch=master)


@rahsheen/react-wizard is a flexible wizard component which can be used with react or react-native.

Making use of render props, @rahsheen/react-wizard allows you to control exactly how each step is rendered.

## Example

```javascript
<Wizard>
  <Wizard.Step>
    {({ nextStep, prevStep }) => {
      return (
        <div>
          <h2>This is Step 1</h2>
          <button onClick={nextStep}>Next</button>
        </div>
      );
    }}
  </Wizard.Step>
  <Wizard.Step>
    {({ submit, prevStep }) => (
      <div>
        <h2>This is Step 2</h2>
        <button onClick={prevStep}>Back</button>
        <button onClick={onSubmit}>Finish</button>
      </div>
    )}
  </Wizard.Step>
</Wizard>
```

