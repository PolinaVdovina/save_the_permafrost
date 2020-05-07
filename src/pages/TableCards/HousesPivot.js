import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { houseSettings, pivotSettings, housePivotSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
import { list } from '../pages';
import { withRouter } from 'react-router';

class HousesPivot extends React.Component {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        
    }

    render() {
        const id = this.props.match.params.id;
        return(
            <>
                <Kompot 
                enterPage={list.pivot.shortPath}
                settings={housePivotSettings}/>
            </>
        )
    }
} 

export default withRouter(HousesPivot)