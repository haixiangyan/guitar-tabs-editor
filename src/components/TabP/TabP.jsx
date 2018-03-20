import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Import styles
import './styles.css';

const config = {
  container: {
    startX: 1,
    endX: 449,
    startY: 20,
    endY: 70
  },

  axisOffset: {
    y: 10
  },
};

const utils = {
  // Get delimiter indexes position
  getDelimiterIndexes(strings) {
    const delimiterRegExp = /\|/g;
    let matchResult = {},
        delimiterIndexes = [];

    // Find | indexes to substring
    while ((matchResult = delimiterRegExp.exec(strings[0]))) {
      delimiterIndexes.push(matchResult.index);
    }

    // Remove the first and last index
    delimiterIndexes.pop();
    delimiterIndexes.shift();

    return delimiterIndexes;
  },
  // Prepare vertical lines
  getVerticalLinesData(delimiterIndexes, length) {
    let indexesLen = delimiterIndexes.length,
        verticalLinesData = [],
        container = config.container,
        x = 0;
    for (let i = 0 ; i < indexesLen ; i++) {
        x = container.startX + (container.endX - container.startX) * ((delimiterIndexes[i]) / length);

        verticalLinesData.push({
          x1: x,
          y1: container.startY,
          x2: x,
          y2: container.endY,
        });
    }

    return verticalLinesData;
  },
  // Get number data
  getNumberData(strings, delimiterIndexes, config) {
    const numRegExp = /([\d])/g;

    let numberData = [],
        bars = [],
        bar = '',
        matchResult = {},
        indexesLen = delimiterIndexes.length,
        stringsLen = strings.length,
        container = config.container,
        axisOffset = config.axisOffset;

    let preIndex = 0, curIndex = 0;

    // Split the whole strings into bars according to the delimiter indexes array
    for (let i = 0 ; i < stringsLen ; i++) {
      // Reset preindex before each iteration
      preIndex = 1;
      for (let j = 0 ; j < indexesLen ; j++) {
        // Mark down current index
        curIndex = delimiterIndexes[j];

        // Push this bar to the array
        bar = strings[i].substring(preIndex, curIndex);
        bars.push(bar);

        // Extract the data
        while ((matchResult = numRegExp.exec(bar))) {
          numberData.push({
            x: container.startX + (preIndex + matchResult.index) / strings[i].length * (container.endX - container.startX),
            y: container.startY + i * axisOffset.y,
            text: bar[matchResult.index]
          });
        }

        preIndex = delimiterIndexes[j] + 1;
      }

      // Substring the last part of this string
      bar = strings[i].substring(preIndex, strings[i].length - 1);
      bars.push(bar);

      // Extract the data
      while ((matchResult = numRegExp.exec(bar))) {
        numberData.push({
          x: container.startX + (preIndex + matchResult.index) / strings[i].length * (container.endX - container.startX),
          y: container.startY + i * axisOffset.y,
          text: bar[matchResult.index]
        });
      }
    }

    return numberData;
  },
  // Main parse function
  parse(source) {
    // Group each string
    let strings = source.split('\n').filter((string) => {
      return !(/^[\s]*$/.test(string));
      }),
        delimiterIndexes = [],
        verticalLinesData = [],
        numberData = [];

    // There should be 6 lines
    if (strings.length !== 6) return ;

    // Get delimiter indexes
    delimiterIndexes = this.getDelimiterIndexes(strings);

    // Use delimiter indexes to get vertical lines data
    verticalLinesData = this.getVerticalLinesData(delimiterIndexes, strings[0].length);

    // Get the number data
    numberData = this.getNumberData(strings, delimiterIndexes, config);

    return {
      verticalLinesData,
      numberData
    }
  }
};

class TabP extends Component {
  render() {
    const { source } = this.props;

    const {verticalLinesData, numberData} = utils.parse(source);

    return (
      <svg className="ge-tabp" width="450" height="75" xmlns="http://www.w3.org/2000/svg">
        {/*Horizontal lines*/}
        <line className="ge-tabp-line" x1="1" y1="20" x2="449" y2="20"/>
        <line className="ge-tabp-line" x1="1" y1="30" x2="449" y2="30"/>
        <line className="ge-tabp-line" x1="1" y1="40" x2="449" y2="40"/>
        <line className="ge-tabp-line" x1="1" y1="50" x2="449" y2="50" />
        <line className="ge-tabp-line" x1="1" y1="60" x2="449" y2="60" />
        <line className="ge-tabp-line" x1="1" y1="70" x2="449" y2="70" />

        {/*Vertical lines(Start, End)*/}
        <line className="ge-tabp-line" x1="1" y1="20" x2="1" y2="70" />
        <line className="ge-tabp-line" x1="449" y1="20" x2="449" y2="70"/>

        {/*Delimiter*/}
        {
          verticalLinesData.map((data, index) => (
            <line key={index} className="ge-tabp-line" x1={data.x1} y1={data.y1} x2={data.x2} y2={data.y2} />
          ))
        }

        {/*Numbers*/}
        {
          numberData.map((data, index) => (
            <g className="ge-tabp-number" key={index}>
              <circle cx={data.x} cy={data.y} r="5"/>
              <text x={data.x} y={data.y + 3}>{data.text}</text>
            </g>
          ))
        }
      </svg>
    );
  }
}

TabP.propTypes = {
  source: PropTypes.string,
};

TabP.defaultProps = {
  source: ''
};

export default TabP;
