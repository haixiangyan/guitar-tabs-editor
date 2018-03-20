import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Import custom components
import Chord from '../../../Chord/Chord';

// Import styles from css
import './styles.css';

// Import chords dataSource
import chords from '../../../../assets/dataSource/chords';

// Define regular expression to get the chord
const chordRegExp = /(?:\[([^\]]*)])?(.)?([^[]*)/g;
const englishRegExp = /[a-zA-Z]/;

const searchChord = (name) => {
  let chordsLen = chords.length;

  for (let i = 0 ; i < chordsLen ; i++) {
    if (chords[i].name === name) {
      return chords[i];
    }
  }
};

export default class Lyrics extends PureComponent {

  /**
   * Method to map chords inside the string
   */
  mapChords = (line) => {
    let chords = [];
    let offset = 2;

    // Extract information from a piece of lyrics
    line.replace(chordRegExp, (match, chord, anchor, extra, index) => {

      // Filter empty line
      if (chord || (anchor && extra)) {
        chords.push({
          name: chord,
          line: line,
          index: chord ? chord.length + index + offset : -1,
          anchor: anchor ? anchor : '',
          extra: extra ? extra : ''
        })
      }
    })

    return chords;
  };

  /**
   * Give a style to anchor according to its type
   */
  mapAnchorStyle = (anchor, index) => {
    return {
      width: englishRegExp.test(anchor) ? 10 : 15,
    }
  };

  render() {
    const {
      children,
      isEmbedChord,
    } = this.props;

    return (
      <div>
        {/* The offset to split each lyrics when the chord is embeded */}
        {
          isEmbedChord && <div style={{height: 30}}></div>
        }
        <p className="ge-lyrics">
          {
            // Map each chord data to the lyrics
            this.mapChords(children).map((chordData, index) => {
              let chord = searchChord(chordData.name);

              return (
              chordData.index > 0 ?
                // Start with chord
                <span className="ge-chord-item" key={index}>
                  <span
                    style={this.mapAnchorStyle(chordData.anchor, chordData.index)}
                    className="ge-anchor">
                    {/* Anchor chord */}
                    {
                      isEmbedChord ?
                      <span className="ge-anchor-chordimg">
                        <Chord chord={chord} options={{size: 'small'}}/>
                      </span>
                      :
                      <span className="ge-anchor-chordname">{chordData.name}</span>
                    }
                    {/* Anchor Text */}
                    <span>{chordData.anchor}</span>
                  </span>
                  <span className="ge-extra">{chordData.extra}</span>
                </span>
                :
                // Normal sentence
                <span key={index}>
                  <span>{chordData.anchor}</span>
                  <span>{chordData.extra}</span>
                </span>
            )})
          }
        </p>
      </div>
    )
  }
}

Lyrics.propTypes = {
  isEmbedChord: PropTypes.bool
};

Lyrics.defaultProps = {
  isEmbedChord: false
};