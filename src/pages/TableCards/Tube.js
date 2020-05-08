import React from 'react';
import Kompot from '../../components/ViewTable/Kompot';
import { samplesSettings } from '../../components/ViewTable/tableSettings'
import TubeCard from '../../components/TubeCard';
import { withRouter, Redirect } from 'react-router';
import { list } from '../pages';
import { connect } from 'react-redux';
import { CreateSample } from '../../components/Dialogs';

const mapStateToProps = function(state) {
    return {
      loggedIn: state.auth.loggedIn,
      login: state.auth.login,
      roles: state.auth.roles,
    }
}

class Tube extends React.Component {
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
                <TubeCard id={id} isCreate={false}/>
                <Kompot
                addivityTableKey={id}
                staticFilters={{ tubeId:[{type:'equal',value:id}] }}
                settings={samplesSettings}
                CardDialog = {CreateSample}
                parentId = {id}
                />
            </>
        )
    }
} 

export default connect(mapStateToProps)(withRouter(Tube))