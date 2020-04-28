import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store'
import {getAllRoutesFromPages} from './pages'

function App() {
  return (
    <Provider store={store}>
      {getAllRoutesFromPages()}
    </Provider>
  );
}

export default App;
