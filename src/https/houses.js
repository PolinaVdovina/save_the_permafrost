import { store } from "../store";

export const getHouseList = (options) => {
    const {
        onSuccess, 
        onFailed,
        filter=[],
        pagination = {
            currentPage: 0,
            rowsPerPage: 10,
        },
        next = null
    } = options;

    const fetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+ store.getState().auth.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify( {filter: filter, pagination: pagination} )
      };

    return fetch('/api/houses/list', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response)
        next && next();
    } ).
    catch(
        response => onFailed && onFailed()
    );
}


export const deleteHouse = (options) => {
    const {
        id,
        onSuccess,
        next
    } = options;

    const fetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+ store.getState().auth.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify( {id:id} )
      };

    return fetch('/api/houses/delete', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response);
        next && next()
    } );
}


export const changeHouse = (options) => {
    const {
        id,
        onSuccess,
        value,
        next
    } = options;
    
    const fetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+ store.getState().auth.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify( value )
      };

    return fetch('/api/houses/change', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response);
        next && next()
    } );
}