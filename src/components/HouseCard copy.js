import React from 'react';
import { Typography, Grid, TextField, Paper } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';



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

    constructor() {
        super();
        this.state = {
            isChangesActive: false,
            house: {
                "district": "",
                "houseId": "13",
                "maxLayingDepth": "",
                "minLayingDepth": "",
                "number": "",
                "street": ""
            }
        };
      }

    componentDidMount() {
        const postGet = {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODc4MjI4ODQsIm5iZiI6MTU4NzgyMjg4NCwianRpIjoiOTA4ODliMjYtODllNy00N2JkLThiNGQtMDIxN2I1YzZlNzcyIiwiaWRlbnRpdHkiOnsidXNlcl9pZCI6MSwidG9rZW5faWQiOjF9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.5P1WwzUlWaSAFXwvCSKfHW4uHZ-4mzbScXXcJUjvvWg',
              'Accept': 'application/json'
            },
        };
        fetch('/api/houses/' + this.state.house.houseId, (postGet)).then(response=>response.json()).then(response=>this.setState({house: response}))
    }

    saveHandler() {
        this.setState({isChangesActive: false})
        const postGet = {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODc4MjI4ODQsIm5iZiI6MTU4NzgyMjg4NCwianRpIjoiOTA4ODliMjYtODllNy00N2JkLThiNGQtMDIxN2I1YzZlNzcyIiwiaWRlbnRpdHkiOnsidXNlcl9pZCI6MSwidG9rZW5faWQiOjF9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.5P1WwzUlWaSAFXwvCSKfHW4uHZ-4mzbScXXcJUjvvWg',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.house)
        };
        fetch('/api/houses/change', (postGet)).then(response=>response.json())
    }


    render() {
        return(
            <Grid container xs={12} sm={7} md={5} spacing={8} justify="center" alignItems="center">
                <Grid item component={Paper} elevation={6} square>
                    <Typography variant="h3">
                        Дом   {!this.state.isChangesActive && <CreateIcon onClick={()=> this.setState({isChangesActive: true})}></CreateIcon>}
                        {this.state.isChangesActive && <SaveIcon onClick={()=> this.saveHandler()}></SaveIcon>}
                    </Typography>
                    
                    <hr></hr>
                    <TextFieldInfo 
                        header="Район" 
                        value={this.state.house.district} 
                        isChangesActive={this.state.isChangesActive}
                        onChange={(event) => this.setState({house: {...this.state.house, "district": event.target.value} })}>
                    </TextFieldInfo>
                    <TextFieldInfo 
                        header="Улица" 
                        value={this.state.house.street} 
                        isChangesActive={this.state.isChangesActive}
                        onChange={(event) => this.setState({house: {...this.state.house, "street": event.target.value} })}>
                    </TextFieldInfo>
                    <TextFieldInfo 
                        header="Номер дома" 
                        value={this.state.house.number} 
                        isChangesActive={this.state.isChangesActive}
                        onChange={(event) => this.setState({house: {...this.state.house, "number": event.target.value} })}>
                    </TextFieldInfo>
                    <TextFieldInfo 
                        header="Минимальная глубина фундамента" 
                        value={this.state.house.minLayingDepth}
                        isChangesActive={this.state.isChangesActive}
                        isNum
                        onChange={(event) => this.setState({house: {...this.state.house, "minLayingDepth": event.target.value} })}>
                    </TextFieldInfo>
                    <TextFieldInfo 
                        header="Максимальная глубина фундамента" 
                        value={this.state.house.maxLayingDepth} 
                        isChangesActive={this.state.isChangesActive}
                        isNum
                        onChange={(event) => this.setState({house: {...this.state.house, "maxLayingDepth": event.target.value} })}>
                    </TextFieldInfo>
                </Grid>
            </Grid> 
        )
    }
}