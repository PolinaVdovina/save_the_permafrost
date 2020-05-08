import React from 'react';
import Card from './Card';
import {load} from '../functions/fetchFunctions'




export default class SampleCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            parentId: props.parentId,
            flag: false
        }
    }


    objectDefault() {
        return(
        {   
            "type": "sample",
            "id": {
                "name": "id",
                "value": '',
                "parentId": this.state.parentId,
                "parentIdName": "tubeId"
            },
            "title": "Замер",
            "rows": [
                {
                    "header": "Глубина",
                    "name": "depth",
                    "value": ""
                },
                {
                    "header": "Температура",
                    "name": "value",
                    "value": ""
                },                
                {
                    "header": "Дата",
                    "name": "date",
                    "value": ""
                }
            ]
        })       
    }


    componentWillMount() {
        let object = this.objectDefault();
        this.setState({object: object, flag: true});
    }

    render() {
        return(
            <div>
                {this.state.flag && <Card object={this.state.object} changesActive={false} isCreate={this.props.isCreate}></Card>}
            </div>
        )
    }
} 