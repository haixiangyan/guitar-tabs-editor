import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

export default class Body extends Component {
  render() {
    return (
      <div className="ge-previewer-header-container">
        Body
      </div>
    )
  }
}

Body.propTypes = {
  editorForm: PropTypes.object
}

Body.defaultProps = {
  editorForm: {
    content: ''
  }
}