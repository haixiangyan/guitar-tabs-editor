import React, { Component } from 'react';

// Import styles from css
import './styles.css';

// Define regular expression to get the chord
const chordRegExp = /\[([\w]*)\](.)?([^[]*)/g;
const englishRegExp = /[a-zA-Z]/;

export default class Lyrics extends Component {

  /**
   * Method to map chords inside the string
   */
  mapChords = (line) => {
    let chords = [];
    let offset = 2;

    // Extract information from a piece of lyrics
    line.replace(chordRegExp, (match, chord, anchor, extra, index) => {
      chords.push({
        name: chord,
        line: line,
        index: chord.length + index + offset,
        anchor: anchor ? anchor : ' ',
        extra: extra ? extra : ' '
      });
    });

    return chords;
  }

  /**
   * Give a style to anchor according to its type
   */
  mapAnchorStyle = (anchor) => {
    return {
      width: englishRegExp.test(anchor) ? 10 : 15,
    }
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <p className="ge-lyrics">
        {
          // Map each chord data to the lyrics
          this.mapChords(children).map((chordData, index) => (
            <span key={index}>
              <span 
                style={this.mapAnchorStyle()} 
                className="ge-anchor">{chordData.anchor}
              </span>
              <span className="ge-extra">{chordData.extra}</span>
            </span>
          ))
        }
      </p>
    )
  }
}
