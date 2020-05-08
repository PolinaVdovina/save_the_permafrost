import React from 'react';
import MainMenu from '../components/MainMenu/MainMenu';
import { Pages } from './';
import { connect } from 'react-redux';



const mapStateToProps = function(state) {
    return {
      loggedIn: state.auth.loggedIn,
      login: state.auth.login,
      roles: state.auth.roles,
    }
}

function Root(props) {
    const {
        loggedIn,
        login,
        roles
    } = props;

    return (
      <>
        <MainMenu></MainMenu>
        {Pages.getAllRoutesFromPages()}
      </>
    );
  }

  export default connect(mapStateToProps)(Root)