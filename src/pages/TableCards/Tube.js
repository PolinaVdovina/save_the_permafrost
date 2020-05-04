import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { tubeSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
export default class Tube extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        
    }

    render() {
        return(
            <>
                <HouseCard id={175}/>
                <Kompot settings={tubeSettings}/>
            </>
        )
    }
} 