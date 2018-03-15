import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

// Import Parser
import Parser from '../../../assets/js/Parser';

export default class Body extends PureComponent {

  render() {
    const {
      editorForm
    } = this.props;
    let test1 = Parser.preProcess(editorForm.content);
    let test = Parser.parseBody(test1);   

    return (
      <div className="ge-previewer-body-container">
        <div className="chord-group">

        </div>
        {
          test.map((renderedItem, index) => (
            <section key={index}>
              {renderedItem}
            </section>
          ))
        }
      </div>
    )
  }
}

Body.propTypes = {
  editorForm: PropTypes.object
}

Body.defaultProps = {
  editorForm: {
    content: ''
  }
}