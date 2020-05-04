import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { store } from '../store';
import { login } from '../actions/AuthActions';
import { connect } from 'react-redux';
import {Link as RouteLink, Redirect, withRouter} from 'react-router-dom'
import { list } from "../pages";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    alignItems:'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#e74c3c",
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#e74c3c",
    '&:hover': {
      backgroundColor: '#f38b14',
    },   
  },
}));



const mapStateToProps = function(state) {
  return {
    loggedIn: state.auth.loggedIn,
    login: state.auth.login,
  }
}



function AuthWindow(props) {
  const classes = useStyles();
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');



  function validate() {

    setErrorPassword('');
    setErrorLogin('');

    const postSend = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: userLogin,
          password,
        })
    };
        
    fetch('/api/auth/login', (postSend)).then((response=>response.json())).then(response=> { 
      switch(response.msg) {
            case 'WRONG_LOGIN':
                userLogin == '' ? setErrorLogin('Заполните логин') : setErrorLogin('Неверный логин');
                break
            case 'WRONG_PASSWORD':
                password == '' ? setErrorPassword('Заполните пароль') : setErrorPassword('Неверный пароль');
                break
            case 'OK':
                alert("ОК");
                localStorage.setItem('access_token',response.access_token);
                localStorage.setItem('user_login', userLogin);
                localStorage.setItem('user_id',response.user_id);     
                localStorage.setItem('user_roles',response.roles);                     
                store.dispatch(login(userLogin, response.access_token, response.user_id, response.roles));
                break
        }
    });

    if (password === '') setErrorPassword('Заполните пароль');
    if (userLogin === '') setErrorLogin('Заполните логин');
  }

  if (props.loggedIn) 
    return (
      <Redirect to={list.homePage.path} />
    )

  return (
    <Grid container component="main" className={classes.root} justify='center' alignItems='center'>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={errorLogin!==''}
              fullWidth
              id="email"
              helperText={errorLogin}
              label="Логин"
              name="email"
              autoComplete="login"
              autoFocus
              onChange={(event) => {setUserLogin(event.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={errorPassword!==''}
              name="password"
              helperText={errorPassword}
              label="Пароль" 
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={validate}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps)(withRouter(AuthWindow));