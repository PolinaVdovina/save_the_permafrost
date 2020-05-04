import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { houseSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
export default class House extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        
    }

    render() {
        return(
            <>
                <HouseCard id={13}  />
                <Kompot settings={houseSettings}/>
            </>
        )
    }
} 