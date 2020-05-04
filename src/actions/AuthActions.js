import * as types from '../constants/ActionTypes';

export function login(login, token, id, roles) {
    return {
      type: types.LOG_IN,
      login,
      token,
      id,
      roles,
    };
  }
  

  export function logout() {
    return {
      type: types.LOG_OUT,
    };
  }
  