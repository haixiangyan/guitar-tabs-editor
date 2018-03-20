import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

// import custom components
import Chord from '../../Chord/Chord';

// Import custom styles
import './styles.css';

// Import Parser
import Parser from './Parser';

export default class Body extends PureComponent {

  render() {
    const {
      headerForm,
      editorForm,
    } = this.props;
    let test1 = Parser.preProcess(editorForm.content);
    let parsedContent = Parser.parseBody(test1, headerForm.isEmbedChord);
    let chords = Parser.parseChords(test1);

    return (
      <div className="ge-previewer-body-container">
        <div className="ge-chord-groups">
          {
            !headerForm.isEmbedChord && chords.map((chord) => (
              <Chord key={chord.name} chord={chord} options={{size: 'large'}}/>
            ))
          }
        </div>
        {
          parsedContent.map((renderedItem, index) => (
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