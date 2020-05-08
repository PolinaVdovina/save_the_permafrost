import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store'
import {Pages} from './pages/'
import { login } from './actions/AuthActions';
import { Kompot } from './components/ViewTable/Kompot';
import MainMenu from './components/MainMenu/MainMenu';
import { Backdrop, CircularProgress, MuiThemeProvider, Grid, makeStyles } from '@material-ui/core';
import theme from './theme';


const drawerWidth = 240;

const useStyles =  makeStyles(theme => ({
  root: {
    flexDirection:'column',
    display: 'flex',
    minHeight: '100vh',
    justifyContent:'center',
    background: 'linear-gradient(to right bottom, #ffffff, #58b0fc)'
    ,
  },
  drawer: {
    width: drawerWidth,

    zIndex: 100,
    whiteSpace: 'nowrap',

  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '55px',

    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },

  paper: {
    padding: '15px'
  }
}));



function App() {
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();
  
  React.useEffect(() => {
    if(localStorage.getItem('access_token')) {
      store.dispatch(login(localStorage.getItem('user_login'), localStorage.getItem('access_token'), localStorage.getItem('user_id'), localStorage.getItem('user_roles') ? localStorage.getItem('user_roles').split(',') : null));
      
    }
    setLoading(false);
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <MainMenu/>
       
          <Grid item style={{height:'10px'}}>
            <main className={classes.content}>
              {loading && <Backdrop open={true}><CircularProgress/></Backdrop>}
              
              {!loading && Pages.getAllRoutesFromPages()}
            </main>
          </Grid>
   
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
