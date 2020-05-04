import React, { useState } from 'react';
import { TableHead, 
    IconButton,
    withStyles,
    Paper,
    Typography,
    Menu,
    TextField,
    Grid,
    MenuItem,
    Drawer,
    Tooltip,
    Divider} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './style';
import { typeSelectors, selectors, changeTextFields } from './filterSelectors';
import { SelectByList, RangeSelector } from './TextFieldTypes';


class FilterDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {
            open,
            classes,
            onClose,
            onAdd,
            onDelete,
            filters = [],
            headers,
            onChange = () => {},
        } = this.props;
        
        const DrawComp = (type, key, props) => {
            if( selectors[type].variant == 'single' ) {
                const C = changeTextFields[headers[key].type];
                return <C {...props}/>
            }
            else if(selectors[type].variant == 'range') {
                const C = RangeSelector;
                return <C {...props} Comp={changeTextFields[headers[key].type]}/>
            }
            
        }



        return (
            <Drawer
                classes={ {paper: classes.filterDrawer } }
                open={open}
                onClose={onClose}
                >
                 <Typography
                 style = {{textAlign: 'center'}} 
                 variant='h6'>Фильтры</Typography>
                 
                { Object.keys(headers).map( (key) => 
                    <Grid key={key} container direction='column' style={{width: '100%',alignItems:'start'}}>
                    <Typography>{headers[key].value}</Typography>
                    {
                        filters[key].map( (filter, index) => 
                        {
                           // const C = ((props) => (<TextField  {...props}  />))
                            
                            //const C = selectors[filter.type].Decorator(changeTextFields[headers[key].type]);
                            return (<Grid key={index} item style={{width:'100%'}}>
                                <Grid container style={{flexWrap:'nowrap', alignItems:'center'}}>
                                    <Tooltip title= 'Удалить фильтр'>
                                        <IconButton 
                                        onClick={

                                            (event) => onDelete(event, key, index)}
                                        className={classes.filterButton}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    {
                                        //<C
                                        //key={'1a'+index}
                                        //style={{minWidth:'inherit', flexGrow:1}}
                                        //value = {filter.value}
                                        //onChange = { (event) => onChange(event, key, index, false) }/>
                                        DrawComp(filter.type, key, {value: filter.value, style:{minWidth:'inherit', flexGrow:1}, onChange: (event) => onChange(event, key, index, false)})
                                    }
                                    <Grid item>
                                    <TextField
                                    value= {filter.type}
                                    onChange = { (event) => onChange(event, key, index, true) }
                                    style={{paddingLeft:'10px'}}
                                    select>
                                    {
                                        typeSelectors[headers[key].type].map( (selectorKey) => 
                                            <MenuItem value={selectorKey}>
                                                {selectors[selectorKey].label}
                                            </MenuItem>
                                        ) 
                                    }
                                    
                                    </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>)
                        }
                    )
                    }
                        
                        <Grid item>
                            <Tooltip title='Добавить фильтр'>
                                <IconButton 
                                onClick={(event) => onAdd(event, key)}
                                className={classes.filterButton}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Divider flexItem style={{height:'1px', marginTop:'12px'}}/>
                    </Grid>
                    
                )}
                
            </Drawer>
        )
    }
}


export default  withStyles(useStyles)(FilterDrawer);  //хуков для стилей у меня нет блять (классы сука), поэтому экспорт делается так