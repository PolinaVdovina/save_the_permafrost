import * as types from '../constants/ActionTypes';

export function login(login, token, id) {
    return {
      type: types.LOG_IN,
      login,
      token,
      id,
    };
  }
  

  export function logout() {
    return {
      type: types.LOG_OUT,
    };
  }
  