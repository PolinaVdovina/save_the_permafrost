import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { houseSettings } from '../../components/ViewTable/tableSettings'
export default class House extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        
    }

    render() {
        return(
           <Kompot settings={houseSettings}/>
        )
    }
} 