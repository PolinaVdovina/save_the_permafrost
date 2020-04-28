import * as types from '../constants/ActionTypes';

const initialState = {
    loggedIn: false,
    login: null,
    token: null,
    user_id: null,
  };

  export default function auth(state = initialState, action) {
    switch (action.type) {
        case types.LOG_IN:
        return {
            loggedIn: true,
            login: action.login,
            token: action.token,
            user_id: action.id,
        }
        case types.LOG_OUT:
        return initialState;
        default:
        return state;
    }
}