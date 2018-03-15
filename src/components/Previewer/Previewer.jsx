import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom components
import Header from './Header/Header';
import Body from './Body/Body';

// Import custom styles
import './styles.css';
import './markdown.css';

export default class Previewer extends Component {
  render() {
    const { headerForm, editorForm } = this.props;

    return (
      <div className="ge-previewer markdown-body">
        <Header editorForm={editorForm} headerForm={headerForm}></Header>
        <Body editorForm={editorForm} headerForm={headerForm}></Body>
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
    isEmbedChord: false,
    song: '',
    singer: '',
    composer: ''
  },
  editorForm: {
    content: ''
  }
}