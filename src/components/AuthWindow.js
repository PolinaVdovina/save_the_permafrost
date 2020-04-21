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
    
  },
}));







export default function AuthWindow() {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');



  function validate() {

    const postSend = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        })
    };
        
    fetch('http://31.31.203.65/api/auth/login', (postSend)).then((response=>response.json())).then(response=> {
        switch(response.msg) {
            case 'WRONG_LOGIN':
                alert('Неверный логин');
                break
            case 'WRONG_PASSWORD':
                alert('Неверный пароль');
                break
            case 'OK':
                alert("OK");
                break
        }
    })
  }

  return (
    <Grid container component="main" className={classes.root} justify='center'>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form} noValidate onSubmit={validate}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Логин"
              name="email"
              autoComplete="login"
              autoFocus
              onChange={(event) => {setLogin(event.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Нет аккаунта? Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}






















/*import React from 'react';
import "./AuthWindow.css";

class AuthWindow extends React.Component {
    render() {
        return(
        <div id="range1">
            <div class="outer">
                <div class="middle">
                    <div class="inner">

                        <div class="login-wr">
                        <h2>Вход</h2>
                        
                            <div class="form">
                                <input type="text" placeholder="Пользователь"/>
                                <input type="password" placeholder="Пароль"/>
                                <button> Авторизация </button>
                                <a href="#"> <p> У вас нет аккаунта? Регистрация </p></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AuthWindow;*/