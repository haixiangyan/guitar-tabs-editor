import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom components
import Button from '../Button/Button';
import Input from '../Input/Input';

// Import custom styles
import './styles.css';
import styles from './styles';

export default class HeaderForm extends Component {
  // Input Handler
  onChange = (event) => {
    // Emit form to APP component
    this.props.onChange({
      ...this.props.form,
      [event.target.name]: event.target.value
    });
  }

  render() {
    const {
      form,
      save,
      reset
    } = this.props;

    return (
      <div className="ge-header-form">
        <form >
          <Input 
            name="song"
            value={form.song}
            style={styles.offsetRight} 
            type="text" 
            placeholder="Name of song"
            onChange={this.onChange}/>
          
          <Input 
            name="singer"
            value={form.singer}
            style={styles.offsetRight} 
            type="text" 
            placeholder="Singer"
            onChange={this.onChange}/>

          <Input 
            name="composer"
            value={form.composer}
            type="text" 
            placeholder="Composer"
            onChange={this.onChange}/>
        </form>

        <div className="operation">
          <Button 
            style={styles.offsetRight} 
            type="primary"
            onClick={save}>
            Save
          </Button>

          <Button 
            type="danger"
            onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    )
  }
}

HeaderForm.propTypes = {
  onChange: PropTypes.func,
  save: PropTypes.func,
  reset: PropTypes.func,
  form: PropTypes.object
};

HeaderForm.defaultProps = {
  onChange: () => {},
  save: () => {},
  reset: () => {},
  form: {
    song: '',
    singer: '',
    composer: '',
  }
}