import React from 'react';
import { Typography, Grid, TextField, Paper, IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import {change, add} from '../functions/fetchFunctions'



function TextFieldInfo(props) {
    let typeString = "";
    if (props.isNum) typeString="number";
    return(
        <Grid container direction="row" spacing={2} alignItems="center" justify="flex-end">
            <Grid item>
                <Typography>{props.header}</Typography>
            </Grid>
            <Grid item>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type={typeString}
                    value={props.value}
                    InputProps={{
                        readOnly: !props.isChangesActive,
                    }}
                    onChange={(event) => props.onChange(event)}
                />
            </Grid>
        </Grid> 
    )
} 



export default class HouseCard extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isChangesActive: false,
            ...props 
        };
    }

    saveHandler() {
        this.setState({isChangesActive: false})
        let json = {};
        for (let i = 0; i < this.state.object.rows.length; i++) 
            json[this.state.object.rows[i].name] = this.state.object.rows[i].value;
        
        if (this.state.object.id.value !== '') {
            json[this.state.object.id.name] = this.state.object.id.value;
            change(this.props.object.type, json);  
        }
        else {
            if (this.state.object.id.parentId != '' && this.state.object.id.parentId != undefined) {
                json[this.state.object.id.parentIdName] = this.state.object.id.parentId;
            }
            add(this.props.object.type, json);
        }
            
    }

    changeHandler(event, row) {
        let i = this.state.object.rows.indexOf(row);
        let mass = this.state.object.rows;
        
        mass[i].value = event.target.value;
        
        this.setState({
            object: {
                ...this.state.object, 
                'rows': mass,
            } 
        })
    }

    render() {       
        const list = 
            this.props.object.rows.map(row => 
                <TextFieldInfo 
                    header={row.header}
                    value={row.value} 
                    isChangesActive={this.state.isChangesActive}
                    key={row.header}
                    onChange={(event) => this.changeHandler(event, row)}
                >
                </TextFieldInfo>
            )

        return(
            <Grid container  justify="left" alignItems="center">
                <Grid item component={Paper} elevation={3} square style={{padding:'32px'}}>
                    <Typography variant="h3">
                        {this.props.object.title}   {!this.state.isChangesActive && <IconButton onClick={()=> this.setState({isChangesActive: true})}><CreateIcon/></IconButton>}
                        {this.state.isChangesActive && <IconButton onClick={()=> this.saveHandler()}><SaveIcon/></IconButton>}
                    </Typography>                   
                    <hr></hr>
                    {list}                   
                </Grid>
            </Grid> 
        )
    }
}