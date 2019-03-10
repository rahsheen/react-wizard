# @rahsheen/react-wizard
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

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


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/11909710?v=4" width="100px;" alt="pahosler"/><br /><sub><b>pahosler</b></sub>](https://github.com/pahosler)<br />[💡](#example-pahosler "Examples") [🤔](#ideas-pahosler "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/38302762?v=4" width="100px;" alt="Jody LeCompte"/><br /><sub><b>Jody LeCompte</b></sub>](https://jodylecompte.com)<br />[⚠️](https://github.com/rahsheen/react-wizard/commits?author=jodylecompte "Tests") [🤔](#ideas-jodylecompte "Ideas, Planning, & Feedback") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!