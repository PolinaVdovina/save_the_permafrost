import React from 'react';
import Card from './Card';
import {load} from '../functions/fetchFunctions'




export default class TubeCard extends React.Component {
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
            "type": "tube",
            "id": {
                "name": "id",
                "value": '',
                "parentId": this.state.parentId,
                "parentIdName": "houseId"
            },
            "title": "Скважина",
            "rows": [
                {
                    "header": "Наименование",
                    "name": "value",
                    "value": ""
                },
                {
                    "header": "Глубина",
                    "name": "depth",
                    "value": ""
                }
            ]
        })       
    }


    componentWillMount() {
        if (this.state.id != undefined && this.state.id != '') {
            load('tube', this.state.id, (temp) => 
                {
                    let object  = {
                        "type": "tube",
                        "id": {
                            "name": "id",
                            "value": this.state.id,
                        },
                        "title": "Скважина",
                        "rows": [
                            {
                                "header": "Наименование",
                                "name": "value",
                                "value": temp.value
                            },
                            {
                                "header": "Глубина",
                                "name": "depth",
                                "value": temp.depth
                            }
                        ]
                    } 
                    this.setState({object: object, flag: true});
                }
            );
        }
        else {
            let object = this.objectDefault();
            this.setState({object: object, flag: true});
        }
    }

    render() {
        return(
            <div>
                {this.state.flag && 
                    <Card 
                        object={this.state.object} 
                        changesActive={this.props.isCreate ? true : false} 
                        isCreate={this.props.isCreate}>
                    </Card>
                }
            </div>
        )
    }
} 