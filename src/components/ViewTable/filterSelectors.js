import { RangeSelectorByComponent, SelectByList, SelectDistrict, NumericTextField, T, RangeSelector, SelectDate } from "./TextFieldTypes"
import { TextField } from "@material-ui/core"

export const selectors = {
    like:      {label: 'включает', variant: 'single'},
    equal:     {label: 'равно', variant: 'single'},
    equalText: {label: 'равно', variant: 'single'},
    more:      {label: 'больше', variant: 'single'},
    less:      {label: 'меньше', variant: 'single'},
    moreEqual: {label: 'больше/равно', variant: 'single'},
    lessEqual: {label: 'меньше/равно', variant: 'single'},
    inRange:   {label: 'в диапазоне',   variant: 'range'},
    outRange:  {label: 'вне диапазона', variant: 'range'}
}

export const typeSelectors = {
    text: ['like', 'equalText'],
    integer: ['equal', 'more', 'less', 'moreEqual', 'lessEqual', 'inRange', 'outRange' ],
    float: ['equal', 'more', 'less', 'moreEqual', 'lessEqual', 'inRange', 'outRange' ],
    date: ['equalText', 'more', 'less', 'moreEqual', 'lessEqual', 'inRange', 'outRange' ],
    district: ['equalText'],
}


export const changeTextFields = {
    text: TextField,
    integer: NumericTextField,
    float: NumericTextField,
    date: SelectDate,
    district: SelectDistrict,
}