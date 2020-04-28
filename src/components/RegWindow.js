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
import PermIdentity from '@material-ui/icons/PermIdentity';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { list } from "../pages";
import { Redirect } from "react-router";

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


function RegWindow(props) {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [userRolesChangeUsers, setUserRolesChangeUsers] = useState(false);
  const [userRolesChangeRecords, setUserRolesChangeRecords] = useState(false);

  function foo() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_login');
    localStorage.removeItem('user_id');
  }

  function validate() {

    setErrorPassword('');
    setErrorLogin('');

    let roles = [];
    if (userRolesChangeUsers) roles.push('ChangeUser');
    if (userRolesChangeRecords) roles.push('ChangeRecord');

    const postSend = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
          roles,
        })
    };


    fetch('/api/auth/register', (postSend)).then((response=>response.json())).then(response=> {
                switch(response.msg) {
                    case 'NOT_ORIGINAL_LOGIN':
                        alert("логин занят")
                        setErrorLogin('Данный логин занят');
                        break;
                    case 'NO_LOGIN':
                        alert("пустой логин")
                        setErrorLogin('Заполните логин');
                        break;
                    case 'WRONG_ROLES':
                        alert('Ошибка в заполнении ролей пользователя');
                        break;
                    case 'OK':
                        alert('Пользователь добавлен успешно!');
                        break
                }
            })//.catch(
                //response=>{this.setState({loading:false})
                //this.setState({connectionDialog: true})});   

    if (password == '') setErrorPassword('Заполните пароль');
  }

  
        return(
        <div>{
        <Grid container component="main" className={classes.root} justify='center' alignItems='center'>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <PermIdentity />
            </Avatar>
            <Typography component="h1" variant="h5">
                Регистрация
            </Typography>
            <form className={classes.form}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                error={errorLogin!=''}
                fullWidth
                id="email"
                helperText={errorLogin}
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
                error={errorPassword!=''}
                name="password"
                helperText={errorPassword}
                label="Пароль" 
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {setPassword(event.target.value)}}
                />
                <Typography variant="h6">Права пользователя:</Typography>

                <Grid container>
                    <Grid item md={12}>
                        <FormControlLabel
                            control={<Checkbox checked={userRolesChangeUsers} onChange={() => setUserRolesChangeUsers(!userRolesChangeUsers)}/>}
                            label="Работа с данными пользователей"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <FormControlLabel
                            control={<Checkbox checked={userRolesChangeRecords} onChange={() => setUserRolesChangeRecords(!userRolesChangeRecords)}/>}
                            label="Работа с сохраненными записями"
                        />
                    </Grid>
                </Grid>
                <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={validate}
                >
                Сохранить
                </Button>
                <Button
                  onClick={foo}>
                  ТКНИ СЮДА
                </Button>
                
            </form>
            </div>
        </Grid>
        </Grid>}
        {!props.loggedIn && <Redirect to={list.registerError.path}/>}
        </div>
        )
    }



    export default connect(mapStateToProps)(RegWindow)
