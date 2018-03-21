import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom components
import TextArea from '../TextArea/TextArea';

// Import custom styles
import './styles.css';

export default class Editor extends Component {

  // Handle editor textarea
  onChange = (event) => {
    // Emit form to APP component
    this.props.onChange(event.target.value);
  };

  // Ref
  textAreaRef = (textArea) => {
    this.textArea = textArea;
  };

  render() {
    const {
      form
    } = this.props;

    return (
      <div className="ge-editor">
        <TextArea
          textAreaRef={this.textAreaRef}
          name="editor"
          value={form.content}
          className="ge-editor-textarea"
          onChange={this.onChange}>
        </TextArea>

        {/*<div className="ge-editor-hint">Hello World</div>*/}
      </div>
    )
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  form: PropTypes.object
};

Editor.defaultProps = {
  onChange: () => {},
  form: {
    content: ''
  }
}