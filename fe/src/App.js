import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Book from './components/CMS/Book/index';
import AddBook from './components/CMS/Book/AddBook/index'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/addBooks" component={AddBook} />
          <Route path="/" component={Book} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
