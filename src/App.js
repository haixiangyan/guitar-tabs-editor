import React, { Component } from 'react';

// Import custom components
import HeaderForm from './components/HeaderForm/HeaderForm';
import Editor from './components/Editor/Editor';
import Previewer from './components/Previewer/Previewer';
import Helper from './components/Helper/Helper';

// Import global css styles
import './assets/css/global.css';

// Import dataSource value
import defaultValues from './assets/dataSource/editor';

class App extends Component {

  state = {
    // Basic information of this song
    headerForm: {
      song: 'Unknown song',
      singer: 'Unknown singer',
      composer: 'Unknown composer',
      isEmbedChord: false
    },
    // Editor content
    editorForm: {
      content: defaultValues.content
    },
    // State of helper
    isShowHelper: false
 };

  // Header form onChange Handler
  handleHeaderForm = (headerForm) => {
    this.setState({ headerForm });
  };

  // Editor form onChange handler
  handleEditorForm = (content) => {
    this.setState({
      editorForm: {
        ...this.editorForm,
        content
      }
    });
  };

  // Toggle helper
  toggleHelper = () => {
    this.setState({
      isShowHelper: !this.state.isShowHelper
    });
  };

  // Download as a pdf
  download = () => {
    alert('The draft is download!');
  };

  render() {
    const {
      headerForm,
      editorForm,
      isShowHelper
    } = this.state;

    return (
      <div className="App">
        {/*Header form*/}
        <header>
          <HeaderForm
            form={headerForm}
            onChange={this.handleHeaderForm}
            download={this.download}
            tips={this.toggleHelper}>
          </HeaderForm>
        </header>

        {/*Editor*/}
        <div className="ge-edit-container">
          <Editor
            form={editorForm}
            onChange={this.handleEditorForm}>
          </Editor>

          {/*Previewer*/}
          <Previewer
            headerForm={headerForm}
            editorForm={editorForm}>
          </Previewer>
        </div>

        {/*Helper*/}
        <div style={{visibility: isShowHelper ? 'visible': 'hidden'}}>
          <Helper toggleHelper={this.toggleHelper}/>
        </div>
      </div>
    );
  }
}

export default App;
