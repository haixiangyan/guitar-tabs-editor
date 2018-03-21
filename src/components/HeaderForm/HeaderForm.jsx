import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Import react-switch
import Switch from 'react-switch';

// Import custom components
import Button from '../Button/Button';
import Input from '../Input/Input';
import {checkedIcon, uncheckedIcon} from './SwitchIcon';

// Import custom styles
import './styles.css';
import styles from './styles';

export default class HeaderForm extends Component {
  // Input handler
  onChange = (event) => {
    // Emit form to APP component
    this.props.onChange({
      ...this.props.form,
      [event.target.name]: event.target.value
    });
  };

  // Switch handler
  onSwitchChange = (isEmbedChord) => {
    this.props.onChange({
      ...this.props.form,
      isEmbedChord
    })
  };

  render() {
    const {
      form,
      preview,
      tips
    } = this.props;

    return (
      <div className="ge-header-form">
        <form>
          <Input
            name="song"
            value={form.song}
            style={styles.offsetRight}
            type="text"
            placeholder="Song"
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

        <div className="ge-operation">
          <a className="ge-github" rel="noopener noreferrer" href="https://github.com/Haixiang6123/Guitar-Editor" target="_blank">
            <svg height="28" viewBox="0 0 16 16" version="1.1" width="32"
                 aria-hidden="true">
              <path fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>

          <Switch
            width={75}
            className="ge-embedchord-switch"
            onColor="#CD5C5C"
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            onChange={this.onSwitchChange}
            checked={form.isEmbedChord}>
          </Switch>

          <Button
            style={styles.offsetRight}
            type="primary"
            onClick={preview}>
            Preview
          </Button>

          <Button
            type="danger"
            onClick={tips}>
            Tips
          </Button>
        </div>
      </div>
    )
  }
}

HeaderForm.propTypes = {
  onChange: PropTypes.func,
  preview: PropTypes.func,
  tips: PropTypes.func,
  form: PropTypes.object
};

HeaderForm.defaultProps = {
  onChange: () => {
  },
  preview: () => {
  },
  tips: () => {
  },
  form: {
    song: '',
    singer: '',
    composer: '',
  }
}