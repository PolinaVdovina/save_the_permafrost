import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Button, withStyles } from '@material-ui/core';
import {useStyles} from './style';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { list } from '../../pages/pages';
import { store } from '../../store';
import { logout } from '../../actions/AuthActions';

const mapStateToProps = function(state) {
    return {
      loggedIn: state.auth.loggedIn,
      login: state.auth.login,
      roles: state.auth.roles,
    }
  }
  


class MainMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        
    }

    render() {
        const {
           classes,
           loggedIn,
           login,
           roles=[],
        } = this.props;

        return(
            <AppBar position="static">
            <Toolbar>

                <Typography variant="h6" className={classes.title}>
                АМИЦ
                </Typography>

                {!loggedIn && 
                <Button
                component={NavLink}
                to={list.auth.path} 
                color="inherit">
                    Авторизация
                </Button>}


                {roles && ((roles.find(r => r=='ChangeUser'))||(roles.find(r => r=='SuperUser'))) &&
                <Button
                component={ NavLink }
                to={list.register.path} 
                color="inherit">
                    Добавить пользователя
                </Button>}

                {loggedIn && 
                <Button
                component={ NavLink }
                to={list.housesPivot.shortPath} 
                color="inherit">
                    Ведомость и графики
                </Button>}

                {roles && ((roles.find(r => r=='ChangeRecord'))||(roles.find(r => r=='SuperUser'))) &&
                <Button
                component={ NavLink }
                to={list.houses.shortPath} 
                color="inherit">
                    Редактировать данные
                </Button>}


                {loggedIn && 
                <Button
                onClick = 
                {
                    () => { 
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('user_login');
                        localStorage.removeItem('user_id');
                        localStorage.removeItem('user_roles');
                        store.dispatch(logout())
                    }
                }
                component={ NavLink }
                to={list.auth.path} 
                color="inherit">
                    Выйти
                </Button>}

                

            </Toolbar>
            </AppBar>
        )
    }
} 



export default connect(mapStateToProps)(withStyles(useStyles)(MainMenu))