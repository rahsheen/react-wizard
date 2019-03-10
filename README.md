# @rahsheen/react-wizard

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.org/rahsheen/react-wizard.svg?branch=master)](https://travis-ci.org/rahsheen/react-wizard)
![npm (scoped)](https://img.shields.io/npm/v/@rahsheen/react-wizard.svg)
[![Coverage Status](https://coveralls.io/repos/github/rahsheen/react-wizard/badge.svg?branch=master)](https://coveralls.io/github/rahsheen/react-wizard?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

React Wizard is a flexible wizard / multi-step form component which can be used with React or React-Native.

Making use of render props (and hooks internally), React Wizard allows you to control exactly how each step is rendered. The ultimate goal will be to not only provide the tools to build a custom wizard, but also provide simpler API's for more specific use-cases.

## Examples

### Basic Usage

```javascript
<Wizard>
  <Wizard.Step>
    {({ nextStep, prevStep, currentIndex }) => {
      return (
        <div>
          <h2>Step {currentIndex}</h2>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )
    }}
  </Wizard.Step>
  <div>
    <Wizard.Step>
      {({ nextStep, prevStep, currentIndex, onChangeValue }) => (
        <div>
          <h2>Enter Your Username</h2>
          <p>Step {currentIndex}</p>
          <input
            type="text"
            onChange={e => onChangeValue("username", e.target.value)}
          />
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
    </Wizard.Step>
  </div>
  <Wizard.Step disabled>
    {" "}
    // This step will not be rendered
    {({ nextStep, prevStep, currentIndex }) => (
      <div>
        <h2>Step {currentIndex}</h2>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    )}
  </Wizard.Step>
  <Wizard.Step>
    {({ nextStep, prevStep, currentIndex, onSubmit }) => (
      <div>
        <h2>Baz {currentIndex}</h2>
        <button onClick={prevStep}>Back</button>
        <button onClick={onSubmit}>Submit</button>
      </div>
    )}
  </Wizard.Step>
</Wizard>
```

### Usage with an Array of Components

```javascript
const steps = [1, 2, 3].map(index => (
  <Wizard.Step>
    {({ nextStep, prevStep, onSubmit }) => (
      <div>
        <h2>Step {index}</h2>
        <button onClick={prevStep}>prev</button>
        <button onClick={nextStep}>next</button>
      </div>
    )}
  </Wizard.Step>
))

return <Wizard steps={steps} />
```

### Combining Both

In this case, the array of `Wizard.Step` components is rendered before those specified as children of the Wizard component.

```javascript
const steps = [1, 2, 3].map(index => (
  <Wizard.Step>
    {({ nextStep, prevStep, onSubmit }) => (
      <div>
        <h2>Step {index}</h2>
        <button onClick={prevStep}>prev</button>
        <button onClick={nextStep}>next</button>
      </div>
    )}
  </Wizard.Step>
))

return (
  <Wizard steps={steps}>
    <Wizard.Step>
      {({ nextStep, prevStep, currentIndex, onSubmit }) => (
        <div>
          <h2>Baz {currentIndex}</h2>
          <button onClick={prevStep}>Back</button>
          <button onClick={onSubmit}>Submit</button>
        </div>
      )}
    </Wizard.Step>
  </Wizard>
)
```

## Contributing

Feel free to dive in! [Open an issue](https://github.com/rahsheen/react-wizard/issues/new) or submit PRs.

React Wizard follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/11909710?v=4" width="100px;" alt="pahosler"/><br /><sub><b>pahosler</b></sub>](https://github.com/pahosler)<br />[💡](#example-pahosler "Examples") [🤔](#ideas-pahosler "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/38302762?v=4" width="100px;" alt="Jody LeCompte"/><br /><sub><b>Jody LeCompte</b></sub>](https://jodylecompte.com)<br />[⚠️](https://github.com/rahsheen/react-wizard/commits?author=jodylecompte "Tests") [🤔](#ideas-jodylecompte "Ideas, Planning, & Feedback") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
