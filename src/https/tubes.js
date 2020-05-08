import { store } from "../store";

export const getTubeList = (options) => {
    const {
        onSuccess, 
        filter=[],
        pagination = {
            currentPage: 0,
            rowsPerPage: 10,
        },
        next = null,
        onFailed
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

    return fetch('/api/tubes/list', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response)
        next && next();
    } ).
    catch(
        response => onFailed && onFailed()
    );;
}


export const deleteTube = (options) => {
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

    return fetch('/api/tubes/delete', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response);
        next && next()
    } );
}


export const changeTube = (options) => {
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

    return fetch('/api/tubes/change', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response);
        next && next()
    } );
}