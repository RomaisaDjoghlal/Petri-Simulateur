import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './ReduxSlice/Store';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import {Sidebar} from './sideBars/Sidebar' ;




function App() {
  return (
      <Router>
        <Sidebar/>
        
      </Router>
      
  );
}

export default App;