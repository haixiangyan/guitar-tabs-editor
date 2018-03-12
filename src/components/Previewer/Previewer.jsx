import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

export default class Previewer extends Component {
  render() {
    return (
      <div className="ge-previewer">
        
      </div>
    )
  }
}

Previewer.propTypes = {
  headerForm: PropTypes.object,
  editorForm: PropTypes.object,
};

Previewer.defaultProps = {
  headerForm: {
    song: '',
    singer: '',
    composer: ''
  },
  editorForm: {
    content: ''
  }
}