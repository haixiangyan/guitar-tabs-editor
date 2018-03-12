import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom css styles
import './styles.css';

export default class TextArea extends Component {
  render() {
    const {
      value,
      name,
      style,
      className,
      onChange
    } = this.props;

    // Add one space if it has a className value
    let filteredClassName = className ? ' ' + className : '';

    return (
      <textarea
        value={value}
        name={name}
        style={style}
        className={`ge-textarea${filteredClassName}`}
        onChange={onChange}>
      </textarea>
    )
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

TextArea.defaultProps = {
  value: '',
  name: '',
  cols: 30,
  rows: 10,
  style: {},
  className: '',
  onChange: () => {}
}