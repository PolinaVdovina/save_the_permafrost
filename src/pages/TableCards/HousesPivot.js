import React from 'react';
import Kompot from '../../components/ViewTable/Kompot';
import { houseSettings, pivotSettings, housePivotSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
import { list } from '../pages';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = function(state) {
    return {
      loggedIn: state.auth.loggedIn,
      login: state.auth.login,
      roles: state.auth.roles,
    }
}

class HousesPivot extends React.Component {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        
    }

    render() {
        const {
            roles,
            loggedIn
        } = this.props;
        const id = this.props.match.params.id;
        return(
            <>
                {!loggedIn && <Redirect to={list.authError.shortPath}/>}
                
                <Kompot 
                enterPage={list.pivot.shortPath}
                settings={housePivotSettings}/>
            </>
        )
    }
} 

export default connect(mapStateToProps)(withRouter(HousesPivot))