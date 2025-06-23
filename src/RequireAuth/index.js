import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const RequireAuth = (WrappedComponent, redirect=true) => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      isAuth: PropTypes.bool
    };

    render() {
      const { isAuth } = this.props;

      if (!isAuth) {
        if (!redirect) return null;
        return <Redirect to='/admin/auth' />;
      }
      return <WrappedComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state) => (
    {
      isAuth: Boolean(state.user.isAuth)
    }
  );
  return connect(mapStateToProps)(WithAuthorization);
};

export default RequireAuth;
