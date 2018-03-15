import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    const { children } = this.props;

    return (
      <blockquote>{children}</blockquote>
    )
  }
}
