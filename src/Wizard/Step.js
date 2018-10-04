import React, { PureComponent } from "react";

export default class Step extends PureComponent {
  render() {
    const {
      children,
      currentIndex,
      isLast,
      prevStep,
      nextStep,
      onChangeValue,
      onSubmit,
      values
    } = this.props;

    return children({
      onChangeValue,
      values,
      prevStep,
      nextStep,
      currentIndex,
      isLast,
      onSubmit
    });
  }
}
