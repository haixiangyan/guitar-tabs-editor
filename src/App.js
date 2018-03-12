import React, { Component } from 'react';

// Import custom components
import HeaderForm from './components/HeaderForm/HeaderForm';
import Editor from './components/Editor/Editor';
import Previewer from './components/Previewer/Previewer';

// Import global css styles
import './assets/css/global.css';

class App extends Component {

  state = {
    // Basic information of this song
    form: {
      song: '',
      singer: '',
      composer: ''
    }
  }

  // Form onChange Handler
  handleForm = (form) => {
    this.setState({ form });
  }

  render() {
    const {
      form
    } = this.state;

    return (
      <div className="App">
        <header>
          <HeaderForm 
            form={form} 
            onChange={this.handleForm}>
          </HeaderForm>
        </header>
        
        <div className="edit-container">
          <Editor></Editor>
          
          <Previewer form={form}></Previewer>
        </div>
      </div>
    );
  }
}

export default App;
