import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { tubeSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
import { withRouter } from 'react-router';
import { list } from '../pages';
import { Button } from '@material-ui/core';
import {CreateHouse} from '../../components/Dialogs';

class House extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        
    }

    render() {
        const {
           
        } = this.props;
        const id = this.props.match.params.id;
        return(
            <>
                <HouseCard id={id} isCreate={false}/>
                <Kompot
                enterPage={list.tube.shortPath}
                staticFilters={{ houseId:[{type:'equal',value:id}] }} settings={tubeSettings}/>
            </>
        )
    }
} 

export default withRouter(House)