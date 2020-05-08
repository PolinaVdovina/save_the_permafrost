import { store } from "../store";

export const getSampleList = (options) => {
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

    return fetch('/api/tubes/samples/list', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response)
        next && next();
    } ).
    catch(
        response => onFailed && onFailed()
    );;
}


export const deleteSample = (options) => {
    const {
        id,
        onSuccess,
        next
    } = options;

    const fetchOptions = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer '+ store.getState().auth.token,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify( {id:id} )
      };

    return fetch('/api/tubes/samples/delete', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response);
        next && next()
    } );
}


export const changeSample = (options) => {
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

    return fetch('/api/tubes/samples/change', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response);
        next && next()
    } );
}