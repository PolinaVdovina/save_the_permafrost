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
  

  function MyMenuItem(props) {
    const {
        component = Button,
        to='',
        title,
        onClick
    } = props;
    const C = component;
    return (
        <C
        onClick={onClick}
        component={NavLink}
        to={to} 
        color="inherit">
            {title}
        </C>
    )
}  


const  MenuButtons = (props) => {
    const {
        classes,
        loggedIn,
        login,
        roles=[],
        component = Button,
    } = props;
    const C = component;
    return <>
            {!loggedIn && 
            <MyMenuItem
            component={C}
            to={list.auth.path} 
            color="inherit"
            title='Авторизация'/>
            }

            
            {roles && ((roles.find(r => r=='ChangeUser'))||(roles.find(r => r=='SuperUser'))) &&
            <MyMenuItem
            component={ C }
            to={list.register.path} 
            color="inherit"
            title="Добавить пользователя"/>}
                


            {loggedIn && 
            <MyMenuItem
            component={ C }
            to={list.housesPivot.shortPath} 
            color="inherit"
            title='Ведомость и графики'
            />}

            {roles && ((roles.find(r => r=='ChangeRecord'))||(roles.find(r => r=='SuperUser'))) &&
            <MyMenuItem
            component={ C }
            to={list.houses.shortPath} 
            color="inherit"
            title='Редактировать данные'
            />}


            {loggedIn && 
            <MyMenuItem
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
            component={ C }
            to={list.auth.path} 
            color="inherit"
            title='Выйти'
            />}
        </>
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
            <AppBar position="fixed" style={{width:'100%'}} >
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    АМИЦ
                    </Typography>
                    <MenuButtons {...this.props}/>
                </Toolbar>
            </AppBar>
        )
    }
} 



export default connect(mapStateToProps)(withStyles(useStyles)(MainMenu))