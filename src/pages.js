import { Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import AuthWindow from "./components/AuthWindow"
import RegWindow from "./components/RegWindow"
import HouseCard from './components/HouseCard';

export const list = {
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
    houseCard: {
        title: 'В разработке...',
        path: '/card',
        component: HouseCard,
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