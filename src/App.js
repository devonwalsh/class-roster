import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import TeacherContainer from './containers/TeacherContainer';
import TeacherDetails from './components/TeacherDetails';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <Router>
        <Navigation className="Navigation" />
        <Container className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/teachers" component={TeacherContainer} />
            <Route exact path="/teachers/:teacherId" component={TeacherDetails} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
