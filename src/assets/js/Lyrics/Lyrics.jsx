import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Import styles from css
import './styles.css';

// Define regular expression to get the chord
const chordRegExp = /(?:\[([\w]*)\])?(.)?([^[]*)/g;
const englishRegExp = /[a-zA-Z]/;

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
  }

  /**
   * Give a style to anchor according to its type
   */
  mapAnchorStyle = (anchor, index) => {
    return {
      width: englishRegExp.test(anchor) ? 10 : 15,
    }
  }

  /**
   * Give a style to lyrics container according to the type of chord
   */
  mapLyricsStyle = (isEmbedChord) => {
    return {
      paddingTop: isEmbedChord ? 15 : 10,
      paddingBottom: isEmbedChord ? 15 : 10,
    }
  }

  render() {
    const {
      children,
      isEmbedChord
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
            this.mapChords(children).map((chordData, index) => (
              chordData.index > 0 ?
                // Start with chord
                <span className="ge-chord-item" key={index}>
                  <span 
                    style={this.mapAnchorStyle(chordData.anchor, chordData.index)} 
                    className="ge-anchor">
                    {/* Anchor chord */}
                    {
                      isEmbedChord ?
                      <svg className="ge-anchor-chordimg" width="42" height="48" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="12" x2="38" y2="12" stroke-width="0.5" stroke="#333333"></line><line x1="8" y1="20" x2="38" y2="20" stroke-width="0.5" stroke="#333333"></line><line x1="8" y1="28" x2="38" y2="28" stroke-width="0.5" stroke="#333333"></line><line x1="8" y1="36" x2="38" y2="36" stroke-width="0.5" stroke="#333333"></line><line x1="8" y1="44" x2="38" y2="44" stroke-width="0.5" stroke="#333333"></line><line x1="8" y1="12" x2="8" y2="44" stroke-width="0.5" stroke="#333333"></line><line x1="14" y1="12" x2="14" y2="44" stroke-width="0.5" stroke="#333333"></line><line x1="20" y1="12" x2="20" y2="44" stroke-width="0.5" stroke="#333333"></line><line x1="26" y1="12" x2="26" y2="44" stroke-width="0.5" stroke="#333333"></line><line x1="32" y1="12" x2="32" y2="44" stroke-width="0.5" stroke="#333333"></line><line x1="38" y1="12" x2="38" y2="44" stroke-width="0.5" stroke="#333333"></line><circle cx="14" cy="32" r="3" stroke="none" fill="#555555"></circle><text x="14" y="31" stroke="none" font-size="0" font-family="Arial" fill="#ffffff" text-anchor="middle">3</text><circle cx="20" cy="24" r="3" stroke="none" fill="#555555"></circle><text x="20" y="23" stroke="none" font-size="0" font-family="Arial" fill="#ffffff" text-anchor="middle">2</text><circle cx="32" cy="16" r="3" stroke="none" fill="#555555"></circle><text x="32" y="15" stroke="none" font-size="0" font-family="Arial" fill="#ffffff" text-anchor="middle">1</text><text x="23" y="9.333333333333334" stroke="none" font-size="9" font-family="Arial Unicode MS, Arial" fill="indianred" letter-spacing="0" text-anchor="middle">C</text><line x1="6" y1="10" x2="10" y2="14" stroke-width="0.5" stroke="#333333"></line><line x1="10" y1="10" x2="6" y2="14" stroke-width="0.5" stroke="#333333"></line></svg>
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
            ))
          }
        </p>
      </div>
    )
  }
}

Lyrics.propTypes = {
  isEmbedChord: PropTypes.bool
}

Lyrics.defaultProps = {
  isEmbedChord: false
}