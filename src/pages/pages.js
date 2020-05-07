import React from 'react';
import Houses from "./TableCards/Houses";
import House from "./TableCards/House";
import Tube from "./TableCards/Tube";
import AuthWindow from "./AuthWindow";
import RegWindow from "./RegWindow";
import RegisterError from "./Home";
import RolesError from "../components/RolesError";
import AuthError from "../components/AuthError";
import { Route } from "react-router";
import Home from "./Home"
import HousesPivot from './TableCards/HousesPivot';
import Pivot from './TableCards/Pivot';

export const list = {
    housesPivot: {
        path: '/housespivot/',
        shortPath: '/housespivot/',
        component: HousesPivot
    },
    pivot: {
        path: '/pivot/:id',
        shortPath: '/pivot/',
        component: Pivot
    },
    houses: {
        path: '/houses',
        shortPath: '/houses/',
        component: Houses
    },
    house: {
        path: '/house/:id',
        shortPath: '/house/',
        component: House
    },
    tube: {
        path: '/tube/:id',
        shortPath: '/tube/',
        component: Tube
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
    authError: {
        title: 'Ошибка регистрации',
        path: '/errorlogin',
        component: AuthError,
    },
    rolesError: {
        title: 'Ошибка регистрации',
        path: '/errorroles',
        component: RolesError,
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