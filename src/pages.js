import { Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import AuthWindow from "./pages/AuthWindow"
import RegWindow from "./pages/RegWindow"
import HouseCard from './components/HouseCard';
import RegisterError from './components/RegisterError'
import RegisterErrorRoles from './components/RegisterErrorRoles'
import Home from './components/Home'
import House from './pages/TableCards/House';
import Tube from './pages/TableCards/Tube';
import Sample from './pages/TableCards/Sample';

export const list = {
    houses: {
        path: '/houses',
        component: House
    },
    house: {
        path: '/house',
        component: Tube
    },
    house: {
        path: '/tube',
        component: Sample
    },
    auth: {
        title: 'Авторизация',
        path: '/auth',
        shortPath: '/auth',
        component: AuthWindow,
    },
    register: {
        title: 'Регистрация',
        path: '/register',
        component: RegWindow,
    },
    registerLoginError: {
        title: 'Ошибка регистрации',
        path: '/errorlogin',
        component: RegisterError,
    },
    registerRolesError: {
        title: 'Ошибка регистрации',
        path: '/errorroles',
        component: RegisterErrorRoles,
    },
    homePage: {
        title: 'Домашняя страница',
        path: '/home',
        component: Home,
    }
};

export const getTitleFromPath = (path) => {
    let page = Object.values(list).find(
        element => (
            path===element.path
        )
    );
    return (page && page.title)||('');
}

export const getRouteFromPage = (page) => <Route path={page.path} component={page.component}/>;

export const getAllRoutesFromPages = () => {
    return(
        <React.Fragment>
        {
            Object.keys(list).map(
                index => getRouteFromPage(list[index])
            )
        }
        </React.Fragment>
    );
}