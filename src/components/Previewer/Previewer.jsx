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
    const { headerForm, editorForm, previewerRef, isEdit } = this.props;

    return (
      <div ref={previewerRef} className={`ge-previewer ${isEdit ? 'ge-previewer-edit' : 'ge-previewer-preview'} markdown-body`}>
        <Header editorForm={editorForm} headerForm={headerForm}/>
        <Body editorForm={editorForm} headerForm={headerForm}/>
      </div>
    )
  }
}

Previewer.propTypes = {
  headerForm: PropTypes.object,
  editorForm: PropTypes.object,
  isEdit: PropTypes.bool
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
  },
  isEdit: false
};