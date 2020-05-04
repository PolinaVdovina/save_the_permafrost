import React from 'react';
import Card from './Card';
import {load} from '../functions/fetchFunctions'


export default class HouseCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temp: {},
            id: ''
        }
    }

    async componentDidMount() {
        let temp;
        let id = this.props.match.params.id;
        if (this.state.id != undefined) {
            temp = await load('house', id); 
            this.setState({temp: temp, id: id});
        }
        
    }

    render() {
        let object = {};
        if (this.state.id != undefined || this.state.id != '') {       
            object = {
                "type": "house",
                "id": {
                    "name": "id",
                    "value": this.state.id
                },
                "title": "Дом",
                "rows": [
                    {
                        "header": "Район",
                        "name": "district",
                        "value": this.state.temp.district
                    },
                    {
                        "header": "Улица",
                        "name": "street",
                        "value": this.state.temp.street
                    },               
                    {
                        "header": "Номер дома",
                        "name": "number",
                        "value": this.state.temp.number
                    },
                    {
                        "header": "Минимальная глубина фундамента",
                        "name": "minLayingDepth",
                        "value": this.state.temp.minLayingDepth
                    },
                    {
                        "header": "Максимальная глубина фундамента",
                        "name": "maxLayingDepth",
                        "value": this.state.temp.maxLayingDepth
                    },
                ]
            } 
            
        }
        else {
            object = {
                "type": "house",
                "id": {
                    "name": "id",
                    "value": ''
                },
                "title": "Дом",
                "rows": [
                    {
                        "header": "Район",
                        "name": "district",
                        "value": ""
                    },
                    {
                        "header": "Улица",
                        "name": "street",
                        "value": ""
                    },               
                    {
                        "header": "Номер дома",
                        "name": "houseId",
                        "value": ""
                    },
                    {
                        "header": "Минимальная глубина фундамента",
                        "name": "minLayingDepth",
                        "value": ''
                    },
                    {
                        "header": "Максимальная глубина фундамента",
                        "name": "maxLayingDepth",
                        "value": ''
                    },
                ]
            }
        }

        alert(JSON.stringify(object))
        
        return(
            <Card object={object}></Card>
        )
    }
} 