import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

// Import Parser
import Parser from '../../../assets/js/Parser';

export default class Body extends PureComponent {

  render() {
    const {
      headerForm,
      editorForm,
    } = this.props;
    let test1 = Parser.preProcess(editorForm.content);
    let test = Parser.parseBody(test1, headerForm.isEmbedChord);   

    return (
      <div className="ge-previewer-body-container">
        <div className="chord-group">

        </div>
        {
          test.map((renderedItem, index) => (
            <section className="ge-previewer-section" key={index}>
              {renderedItem}
            </section>
          ))
        }
      </div>
    )
  }
}

Body.propTypes = {
  headerForm: PropTypes.object,
  editorForm: PropTypes.object,
}

Body.defaultProps = {
  headerForm: {
    isEmbedChord: false,
    song: '',
    singer: '',
    composer: ''
  },
  editorForm: {
    content: ''
  },
}