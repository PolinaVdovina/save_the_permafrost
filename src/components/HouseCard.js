import React from 'react';
import Card from './Card';
import {load} from '../functions/fetchFunctions'

const objectDefault = {
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


export default class HouseCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            object: objectDefault,
            id: props.id //13
        }
    }

    async componentDidMount() {
        if (this.state.id != undefined || this.state.id != '') {
            let temp = await load('house', this.state.id); 
            let object = {
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
                        "value": temp.district
                    },
                    {
                        "header": "Улица",
                        "name": "street",
                        "value": temp.street
                    },               
                    {
                        "header": "Номер дома",
                        "name": "number",
                        "value": temp.number
                    },
                    {
                        "header": "Минимальная глубина фундамента",
                        "name": "minLayingDepth",
                        "value": temp.minLayingDepth
                    },
                    {
                        "header": "Максимальная глубина фундамента",
                        "name": "maxLayingDepth",
                        "value": temp.maxLayingDepth
                    },
                ]
            } 
            this.setState({object: object});
            alert(JSON.stringify(this.state.object));
        }
        
    }

    render() {
        
        
        return(
            <Card object={this.state.object}></Card>
        )
    }
} 