import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './styles.css';

export default class Header extends Component {
  render() {
    const { headerForm } = this.props;

    return (
      <div className="ge-previewer-header">
        {/* Name of this song */}
        <h1>{headerForm.song}</h1>

        <div className="meta">
          {/* Singer */}
          <section>
            <span className="keyword">Performed by: </span>{headerForm.singer}
          </section>
          {/* Composer */}
          <section>
            <span className="keyword">Composed by: </span>{headerForm.composer}
          </section>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  headerForm: PropTypes.object
};

Header.defaultProps = {
  headerForm: {
    song: '',
    singer: '',
    composer: '',
  }
};