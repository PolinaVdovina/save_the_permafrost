import { store } from "../store";

export const getPivotList = (options) => {
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

    return fetch('/api/houses/pivot', fetchOptions).
    then(response => response.json()).
    then(response => {
        onSuccess && onSuccess(response)
        next && next();
    } ).
    catch(
        response => onFailed && onFailed()
    );
}
