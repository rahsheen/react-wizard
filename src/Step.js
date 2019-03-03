import React, { PureComponent } from "react"

export default class Step extends PureComponent {
  render() {
    const { children, ...rest } = this.props

    return children({ ...rest })
  }
}
