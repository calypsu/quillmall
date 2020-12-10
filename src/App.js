import React from 'react';
import './App.css';

import IndexPage from './pages';
import MapPage from './pages/map';
import ThankYouPage from './pages/thank-you';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuizCompletePage from './pages/quiz-complete';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/map' component={MapPage} />
        <Route exact path='/thank-you' component={ThankYouPage} />
        <Route exact path='/complete' component={QuizCompletePage} />
        <Route component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default App;
