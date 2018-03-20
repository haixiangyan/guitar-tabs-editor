import React from 'react';

import Lyrics from './Lyrics/Lyrics';
import Comment from './Comment/Comment';
import Chorus from './Chorus/Chorus';

// Regular expression for global source text matching
const metaRegExp = /^(?:{meta:([^}]*)})$/gm;

// Regular expression for each line matching
const commentRegExp = /^(?:{comment:([^}]*)})$/g;
const startTabRegExp = /^{start_of_tab}$/g;
const endTabRegExp = /^{end_of_tab}$/g;
const startChorusRegExp = /^{start_of_chorus}$/g;
const endChorusRegExp = /^{end_of_chorus}$/g;

export default {
  /**
   * Remove some unnecssary charaters
   * @param {*} source 
   */
  preProcess(source) {
    let filteredSource = source;

    // Remove space
    filteredSource = filteredSource.replace(metaRegExp, '');

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
  parseBody(source, isEmbedChord) {
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

      if (text === '') {
        // Ignore empty line
      }
      else if (startChorusRegExp.test(text)) {
         renderedBuffer[renderedBuffer.length] = [];
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
        renderedBuffer[flag.index] = (<Chorus>{
          renderedBuffer[flag.index].map((lyrics, index) => (
            <Lyrics isEmbedChord={isEmbedChord} key={index}>{lyrics}</Lyrics>
          ))
        }</Chorus>);
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
        renderedBuffer[flag.index].push(text);
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
        renderedBuffer.push(<Lyrics isEmbedChord={isEmbedChord}>{text}</Lyrics>)
      }
    }

    return renderedBuffer;
  }
}