import React, {Component} from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import Result from './Result';

class MyRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/result" component={Result} />
        </div>
      </Router>
    );
  }
}

export default MyRouter;
