import React, {Component} from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Product from './product/product';
import  NotFoundPage from './common/NotFoundPage';
import Search from './search/search';
import NavBar from './NavBar';
import './App.css';

function App() {
  return (
    <Router>
    
      <div className="App">
       <NavBar />
       <div id="page-body">
        <Switch>
          <Route path="/product/:link*" component={Product}  exact />
          <Route path="/search" component={Search}  />
          <Route  component={NotFoundPage}  />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
