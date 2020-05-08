import * as types from '../constants/ActionTypes';
import { houseSettings, tubeSettings, samplesSettings, pivotSettings, housePivotSettings } from '../components/ViewTable/tableSettings';
import { typeSelectors } from '../components/ViewTable/filterSelectors';
import { TextField } from '@material-ui/core';

function defaultFilters(settings) {
    let dict = {};
    Object.keys(settings.headers).map(key => dict[key] = [{ value: '', type: typeSelectors[settings.headers[key].type][0]  }] );
    return dict;
}

const initialState = {
    filter: {
        houses: defaultFilters(houseSettings),
        tubes: defaultFilters(tubeSettings),
        samples: defaultFilters(samplesSettings),
        pivot: defaultFilters(pivotSettings),
        housesPivot: defaultFilters(housePivotSettings)
    },
    pagination: {

    }
  };



export default function filter(state = initialState, action) {
    switch (action.type) {
        case types.SET_FILTER:
        return {
            ...state,
            filter: {
                ...state.filter, 
                [action.key]: action.filters    //ключ ТАБЛИЦЫ СУКА
            }
        }
        break;
        case types.SET_PAGINATION:
        return {
            ...state,
            pagination: {
                ...state.pagination, 
                [action.key]: action.pagination    //ключ ТАБЛИЦЫ СУКА
            }
        }
        default:
        return state;
    }
}
