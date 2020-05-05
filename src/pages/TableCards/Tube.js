import React from 'react';
import { Kompot } from '../../components/ViewTable/Kompot';
import { samplesSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
import { withRouter } from 'react-router';
import { list } from '../pages';

class Tube extends React.Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        
    }

    render() {
        const id = this.props.match.params.id;
        return(
            <>
                <HouseCard id={id} />
                <Kompot

                staticFilters={{ tubeId:[{type:'equal',value:id}] }}
                settings={samplesSettings}/>
            </>
        )
    }
} 

export default withRouter(Tube)