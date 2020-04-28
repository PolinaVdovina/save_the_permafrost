import { Route, BrowserRouter } from 'react-router-dom'
import React from 'react'

export const list = {
    auth: {
        title: 'Авторизация',
        path: '/login',
        component: AuthWindow,
    },
    register: {
        title: 'Регистрация',
        path: '/register',
        component: RegWindow,
    },
    registerError: {
        title: 'Ошибка регистрации',
        path: '/register/error',
        component: RegisterError,
    }
}