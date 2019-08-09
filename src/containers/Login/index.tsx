import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginForm from '../../components/LoginForm';
import {
  LoginOptions,
  loginRequested,
} from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ auth }: State) => auth;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (options: LoginOptions) => dispatch(loginRequested(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
