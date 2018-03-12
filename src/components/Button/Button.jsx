import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom css styles
import './styles.css';

export default class Button extends Component {
  render() {
    const { 
      children,
      type,
      onClick,
      style,
      className,
    } = this.props;

    // Add one space if it has a className value
    let filteredClassName = className ? ' ' + className : '';

    return (
      <span 
        onClick={onClick}
        className={`ge-btn ge-${type}-btn${filteredClassName}`}
        style={style}>
        {children}
      </span>
    )
  }
}

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: '',
  type: 'primary',
  onClick: () => {},
  style: {},
  className: ''
}