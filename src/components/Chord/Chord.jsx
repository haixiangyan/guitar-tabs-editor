import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

// Functions to calculate coordinates of different objects according to given point
import utils from './utils';

const chordConfig = {
  small: {
    container: {
      width: 42,
      height: 48,
      radius: 3,
      isShowText: false
    },

    title: {
      x: 23,
      y: 9.333333333333334,
      fontSize: 9
    },

    origin: {
      x: 8,
      y: 12
    },

    axisOffset: {
      x: 6,
      y: 8
    },

    crossOffset: 2,

    textYAxisOffset: 3.5
  },
  large: {
    container: {
      width: 90,
      height: 86,
      radius: 6,
      isShowText: true
    },

    title: {
      x: 46,
      y: 15.333333333333332,
      fontSize: 13
    },

    origin: {
      x: 16,
      y: 20
    },

    axisOffset: {
      x: 12,
      y: 14
    },

    crossOffset: 4,

    textYAxisOffset: 3.5
  }
};

class Chord extends Component {
  render() {
    const { chord, options } = this.props;

    const {name, points, lines, crosses, min, max} = chord;

    // Configuration
    const config = chordConfig[options.size];

    // Calculate max and min
    const minPoint = min ? utils.getTextCoordinates(min, config) : -1,
      maxPoint = max ? utils.getTextCoordinates(max, config) : -1;

    return (
      <svg className="ge-chord" width={config.container.width} height={config.container.height} xmlns="http://www.w3.org/2000/svg">
        {/*Horizontal lines*/}
        {
          [0, 1, 2, 3, 4].map((num) => {
            let startPoint = utils.getPointCoordinates({x: 0, y: num}, config),
              endPoint = utils.getPointCoordinates({x: 5, y: num}, config);
            return (
              <line
                key={num}
                className="ge-chord-line"
                x1={startPoint.x}
                y1={startPoint.y}
                x2={endPoint.x}
                y2={endPoint.y}/>
            )
          })
        }
        {/*Vertical lines*/}
        {
          [0, 1, 2, 3, 4, 5].map((num) => {
            let startPoint = utils.getPointCoordinates({x: num, y: 0}, config),
              endPoint = utils.getPointCoordinates({x: num, y: 4}, config);
            return (
              <line
                key={num}
                className="ge-chord-line"
                x1={startPoint.x}
                y1={startPoint.y}
                x2={endPoint.x}
                y2={endPoint.y}/>
            )
          })
        }
        {/*Points*/}
        {
          points.map((point, index) => {
            let calculatedPoint = utils.getPointCoordinates(point, config),
              textPoint = utils.getTextCoordinates(point, config);
            return (
              <g className="ge-chord-point" key={index}>
                <circle
                  cx={calculatedPoint.x}
                  cy={calculatedPoint.y}
                  r={config.container.radius}
                  stroke="none"
                  fill="#555555"/>
                {
                  config.container.isShowText &&
                  <text
                    x={textPoint.x}
                    y={textPoint.y}>
                    {point.text}
                  </text>
                }
              </g>)
          })
        }

        {/*Barre*/}
        {
          lines.map((line) => {
            let startPoint = utils.getPointCoordinates(line.start, config),
              endPoint = utils.getPointCoordinates(line.end, config),
              middlePoint = utils.getMiddleCoordinates(startPoint, endPoint, config);

            return (
              <g className="ge-chord-barre" key={line.text}>
                <line
                  x1={startPoint.x}
                  y1={startPoint.y}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  strokeWidth={config.container.radius}/>
                <circle
                  cx={middlePoint.x}
                  cy={middlePoint.y}
                  r={config.container.radius}>
                </circle>
                {
                  config.container.isShowText &&
                  <text x={middlePoint.x} y={middlePoint.y + config.textYAxisOffset}>
                    {line.text}
                  </text>
                }
              </g>
            )
          })
        }

        {/*Name of this chord*/}
        <text className="ge-chord-name"
              fontSize={config.title.fontSize}
              x={config.title.x}
              y={config.title.y}>
          {name}
        </text>

        {/*Crosses on the top of left*/}
        {
          crosses.map((point, index) => {
            let calculatedCross = utils.getCrossCoordinates(point, config);

            return (
              <g key={index}>
                <line
                  className="ge-chord-line"
                  x1={calculatedCross.leftLine.x1}
                  y1={calculatedCross.leftLine.y1}
                  x2={calculatedCross.leftLine.x2}
                  y2={calculatedCross.leftLine.y2}/>
                <line
                  className="ge-chord-line"
                  x1={calculatedCross.rightLine.x1}
                  y1={calculatedCross.rightLine.y1}
                  x2={calculatedCross.rightLine.x2}
                  y2={calculatedCross.rightLine.y2}/>
              </g>)
          })
        }

        {/*Min*/}
        {
          min &&
          <text
            className="ge-chord-min"
            x={minPoint.x}
            y={minPoint.y}>
            {min.text}
          </text>
        }

        {/*Max*/}
        {
          max &&
          <text
            className="ge-chord-max"
            x={maxPoint.x}
            y={maxPoint.y}>
            {max.text}
          </text>
        }
      </svg>
    );
  }
}

Chord.propTypes = {
  chord: PropTypes.object,
  options: PropTypes.object
};

Chord.defaultProps = {
  chord: {
    crosses: [],
    name: '',
    pointers: [],
    lines: [],
    min: {
      text: '',
      x: -1,
      y: -1
    },
    max: {
      text: '',
      x: -1,
      y: -1
    }
  },
  options: {
    size: 'large'
  }
};

export default Chord;
