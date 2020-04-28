import * as reducers from './reducers';
import { combineReducers, createStore } from 'redux';


export const reducer = combineReducers(reducers);
export const store = createStore(reducer)