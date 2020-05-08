import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store'
import {Pages} from './pages/'
import { login } from './actions/AuthActions';
import { Kompot } from './components/ViewTable/Kompot';
import MainMenu from './components/MainMenu/MainMenu';
import Root from './pages/Root';
import { Backdrop, CircularProgress } from '@material-ui/core';

function App() {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if(localStorage.getItem('access_token')) {
      store.dispatch(login(localStorage.getItem('user_login'), localStorage.getItem('access_token'), localStorage.getItem('user_id'), localStorage.getItem('user_roles').split(',')));
      
    }
    setLoading(false);
  })

  return (
    <Provider store={store}>
      {loading && <Backdrop open={true}><CircularProgress/></Backdrop>}
      <MainMenu></MainMenu>
      {!loading && Pages.getAllRoutesFromPages()}
    </Provider>
  );
}

export default App;
