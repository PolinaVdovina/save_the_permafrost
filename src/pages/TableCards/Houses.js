import React from 'react';
import Kompot from '../../components/ViewTable/Kompot';
import { houseSettings } from '../../components/ViewTable/tableSettings'
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


class Houses extends React.Component {
    constructor(props) {
        super(props)
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
                {roles && !((roles.find(r => r=='ChangeRecord'))||(roles.find(r => r=='SuperUser'))) && <Redirect to={list.rolesError.path}/>}

                <Kompot 
                enterPage={list.house.shortPath}
                settings={houseSettings}/>
            </>
        )
    }
} 

export default connect(mapStateToProps)(withRouter(Houses))