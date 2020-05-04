import React from 'react';
import { Typography, Grid, TextField, Paper } from '@material-ui/core';
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
            object: this.props.object,
  
        };
    }

    componentDidMount() {
       // this.setState({object: this.props.object});
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
        //alert("child state" + JSON.stringify(this.state.object));
        //alert("child props" + JSON.stringify(this.props.object));
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
            <Grid container xs={12} sm={7} md={5} spacing={8} justify="center" alignItems="center">
                <Grid item component={Paper} elevation={6} square>
                    <Typography variant="h3">
                        {this.props.object.title}   {!this.state.isChangesActive && <CreateIcon onClick={()=> this.setState({isChangesActive: true})}></CreateIcon>}
                        {this.state.isChangesActive && <SaveIcon onClick={()=> this.saveHandler()}></SaveIcon>}
                    </Typography>                   
                    <hr></hr>
                    {list}                   
                </Grid>
            </Grid> 
        )
    }
}