import React from 'react';

// Regular expression for global source text matching
const metaRegExp = /^(?:{meta:([^}]*)})$/gm;
const spaceRegExp = /^[\s]*$/gm

// Regular expression for each line matching
const commentRegExp = /^(?:{comment:([^}]*)})$/g;
const startTabRegExp = /^{start_of_tab}$/g;
const endTabRegExp = /^{end_of_tab}$/g;

// Component of tab
const Comment = function (props) {
  return <blockquote>{props.children}</blockquote>;
}
const Lyrics = function (props) {
  return <p>{props.children}</p>
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
        flag = '', // To cache the label
        text = '';

    // Iterate each line
    for (let i = 0; i < sourceBufferLen; i++) {
      // Cache current text
      text = sourceBuffer[i];

      // Match {start_of_tab} label
      if (startTabRegExp.test(text)) {
        /*
         * If this line match {start_of_tab} label
         * then append the tab component to the buffer
         */
        // console.log(text, startTabRegExp.test(text))
        flag = 'tab';
      }
      // Match {end_of_tab} label
      else if (endTabRegExp.test(text)) {
        /*
         * If this line match {end_of_tab} label
         * then reset flag
         */
        // console.log(text, endTabRegExp.test(text))
        flag = '';
      }
      // Reading tab content
      else if (flag === 'tab') {
        // console.log('tab', text, flag)
        renderedBuffer.push(text);
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
      }
    }

    return renderedBuffer;
  }
}