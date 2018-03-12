import React, { Component } from 'react';

// Import custom components
import HeaderForm from './components/HeaderForm/HeaderForm';
import Editor from './components/Editor/Editor';
import Previewer from './components/Previewer/Previewer';

// Import global css styles
import './assets/css/global.css';

// Import default value
import defaultValues from './assets/default/index';

class App extends Component {

  state = {
    // Basic information of this song
    headerForm: {
      song: 'Unknown song',
      singer: 'Unknown singer',
      composer: 'Unknown composer'
    },
    // Editor content
    editorForm: {
      content: defaultValues.content
    }
  }

  // Header form onChange Handler
  handleHeaderForm = (headerForm) => {
    this.setState({ headerForm });
  }

  // Editor form onChange handler
  handleEditorForm = (content) => {
    this.setState({ 
      editorForm: {
        ...this.editorForm,
        content
      } 
    });
  }

  // Save this tab
  save = () => {
    alert('This tab is saved!');
  }

  // Reset this tab
  reset = () => {
    alert('The draft is reset!');
  }

  render() {
    const {
      headerForm,
      editorForm
    } = this.state;

    return (
      <div className="App">
        <header>
          <HeaderForm
            form={headerForm} 
            onChange={this.handleHeaderForm}
            save={this.save}
            reset={this.reset}>
          </HeaderForm>
        </header>
        
        <div className="ge-edit-container">
          <Editor 
            form={editorForm}
            onChange={this.handleEditorForm}>
          </Editor>
          
          <Previewer 
            headerForm={headerForm} 
            editorForm={editorForm}>
          </Previewer>
        </div>
      </div>
    );
  }
}

export default App;
