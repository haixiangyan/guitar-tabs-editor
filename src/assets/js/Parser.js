import React from 'react';

import Lyrics from './Lyrics/Lyrics';

// Regular expression for global source text matching
const metaRegExp = /^(?:{meta:([^}]*)})$/gm;
const spaceRegExp = /^[\s]*$/gm

// Regular expression for each line matching
const commentRegExp = /^(?:{comment:([^}]*)})$/g;
const startTabRegExp = /^{start_of_tab}$/g;
const endTabRegExp = /^{end_of_tab}$/g;
const startChorusRegExp = /^{start_of_chorus}$/g;
const endChorusRegExp = /^{end_of_chorus}$/g;
const chordRegExp = /\[([\w]*)\]/g;

// Component of tab
const Comment = function(props) {
  return <blockquote>{props.children}</blockquote>;
}
const Chorus = function(props) {
  const styles = {
    fontSize: '1em'
  }
  return (
    <blockquote style={styles}>
      <pre>
        {props.children}
      </pre>
    </blockquote>
  )
}

// Global resources
const chords = [];

const mapChords = function(line) {
  let offset = 2;

  line.replace(chordRegExp, (match, chord, index) => {
    chords.push({
      name: chord,
      line: line,
      index: chord.length + index + offset
    })
  })
}

export default {
  /**
   * Remove some unnecssary charaters
   * @param {*} source 
   */
  preProcess(source) {
    let filteredSource = source;

    // Remove space
    filteredSource = filteredSource.replace(metaRegExp, '');
    filteredSource = filteredSource.replace(spaceRegExp, '');

    return filteredSource;
  },
  /**
   * To parse the meta data
   * @param {string} source 
   */
  parseMeta(source) {
    let metaData = [];

    source.replace(metaRegExp, (match, metaItem) => {
      // Append meta item data to the meta array
      metaData.push(metaItem);
    });

    return metaData;
  },
  /**
   * To parse the body excluding meta data
   * @param {string} source 
   */
  parseBody(source) {
    let sourceBuffer = source.split('\n'),
        sourceBufferLen = sourceBuffer.length,
        renderedBuffer = [],
        flag = {
          id: '',
          index: -1,
        }, // To cache the label
        text = '';

    // Iterate each line
    for (let i = 0; i < sourceBufferLen; i++) {
      // Cache current text
      text = sourceBuffer[i];

      if (startChorusRegExp.test(text)) {
         renderedBuffer[renderedBuffer.length] = '';
         /*
          * If this line match {start_of_chorus} label
          * then append the tab component to the buffer
          */
         flag = {
          id: 'chorus',
          index: renderedBuffer.length - 1 // record current rendered array index
        };
      }
      // Match {start_of_tab} label
      else if (startTabRegExp.test(text)) {
        /*
          * If this line match {end_of_chorus} label
          * then append the tab component to the buffer
          */
        flag = {
          id: 'tab',
          index: renderedBuffer.length - 1 // record current rendered array index
        }
      }
      // Match {end_of_tab} label
      else if (endTabRegExp.test(text)) {
        /*
         * If this line match {end_of_tab} label
         * then reset flag
         */
        flag = {
          id: '',
          index: -1
        };
      }
      else if (endChorusRegExp.test(text)) {
        // Add the whole component to rendered array
        // console.log(renderedBuffer[flag.index])
        renderedBuffer[flag.index] = (<Chorus>{renderedBuffer[flag.index]}</Chorus>);
        flag = {
          id: '',
          index: -1
        };
      }
      // Reading tab content
      else if (flag.id === 'tab') {
        renderedBuffer.push(text);
      }
      // Reading chorus content
      else if (flag.id === 'chorus') {
        // Append text to blockquote
        renderedBuffer[flag.index] = renderedBuffer[flag.index] + text + '\n';
        // Map chords
        mapChords(text);
      }
      // Match {comment: ...} label
      else if (commentRegExp.test(text)) {
        /* 
         * If this line match {comment} label
         * then append the Comment comonent
         */
        text.replace(commentRegExp, (match, comment) => {
          renderedBuffer.push(<Comment>{comment}</Comment>);
        })
      }
      // Match the other part, like lyrics
      else {
        /* 
         * If this line is lyrics
         * then append the Lyrics component
         */
        renderedBuffer.push(<Lyrics>{text}</Lyrics>)
        // Map chords
        mapChords(text);
      }
    }

    return renderedBuffer;
  }
}