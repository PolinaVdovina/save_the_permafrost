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
            "name": "number",
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
            id: props.id,
            flag: false
        }
    }

    componentWillMount() {
        if (this.state.id != undefined && this.state.id != '') {
            load('house', this.state.id, (temp) => 
                {
                    let object  = {
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
                    this.setState({object: object, flag: true});
                }
            );
        }
        else {
            this.setState({object: objectDefault, flag: true});
        }
    }

    render() {
        return(
            <div>
                {this.state.flag && <Card object={this.state.object}></Card>}
            </div>
        )
    }
} 