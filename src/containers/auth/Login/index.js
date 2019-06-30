import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from './actionCreators';

export const LoginContainer = ({ children }) => <Fragment>{children}</Fragment>;

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = { increment, decrement, reset };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
