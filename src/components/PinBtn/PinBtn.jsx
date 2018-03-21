import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class PinBtn extends Component {
  render() {
    const {
      children,
      left,
      right,
      bottom,
      top,
      bgColor,
      textColor,
      onClick
    } = this.props;

    const style = {
      backgroundColor: bgColor,
      color: textColor,
      left: left,
      top: top,
      right: right,
      bottom: bottom,
    };

    return (
      <div onClick={onClick} style={style} className="ge-pinbtn">
        {children}
      </div>
    );
  }
}

PinBtn.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func
};

PinBtn.defaultProps = {
  top: undefined,
  left: undefined,
  right: undefined,
  bottom: undefined,
  bgColor: 'indianred',
  textColor: 'white',
  onClick: () => {}
}

export default PinBtn;
