import React from 'react';
import Kompot from '../../components/ViewTable/Kompot';
import { tubeSettings } from '../../components/ViewTable/tableSettings'
import HouseCard from '../../components/HouseCard';
import { withRouter, Redirect } from 'react-router';
import { list } from '../pages';
import { connect } from 'react-redux';
import { CreateTube } from '../../components/Dialogs';

const mapStateToProps = function(state) {
    return {
      loggedIn: state.auth.loggedIn,
      login: state.auth.login,
      roles: state.auth.roles,
    }
}


class House extends React.Component {
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
                <HouseCard id={id} isCreate={false}/>
                <div style={{height:'25px'}}/>
                <Kompot
                enterPage={list.tube.shortPath}
                staticFilters={{ houseId:[{type:'equal',value:id}] }} 
                settings={tubeSettings}
                addivityTableKey={id}
                CardDialog = {CreateTube}
                parentId={id}/>
            </>
        )
    }
} 

export default connect(mapStateToProps)(withRouter(House))