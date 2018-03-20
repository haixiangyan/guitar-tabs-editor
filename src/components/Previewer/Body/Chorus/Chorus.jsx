import React, { Component } from 'react'

export default class Chorus extends Component {
  render() {
    const { children } = this.props;

    return (
      <blockquote className="ge-chorus">
          {children}
      </blockquote>
    )
  }
}