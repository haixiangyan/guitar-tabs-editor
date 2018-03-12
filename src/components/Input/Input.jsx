import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

export default class Input extends Component {
  render() {
    const {
      value,
      type,
      placeholder,
      style,
      className,
      onChange,
      name,
    } = this.props;

    // Add one space if it has a className value
    let filteredClassName = className ? ' ' + className : '';

    return (
      <input 
        name={name}
        value={value}
        className={`ge-input${filteredClassName}`}
        type={type} 
        style={style}
        placeholder={placeholder}
        onChange={onChange}/>
    )
  }
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string
};

Input.defaultProps = {
  value: '',
  type: 'text',
  placeholder: '',
  style: {},
  onChange: () => {},
  name: ''
}