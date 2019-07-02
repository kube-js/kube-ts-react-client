import React, { Fragment } from 'react';
import { connect } from 'react-redux';

export const LoginContainer = ({ children }: { children: any }) => (
  <Fragment>{children}</Fragment>
);

const mapStateToProps = (state: any /*, ownProps*/) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
