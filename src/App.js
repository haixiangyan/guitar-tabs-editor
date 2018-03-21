import React, {Component} from 'react';

// Import custom components
import MyRouter from './pages/MyRouter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyRouter/>
      </div>
    );
  }
}

export default App;
