import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginForm from '../../components/LoginForm';
import { loginRequested } from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ auth }: State) => auth;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (email: string, password: string) =>
    dispatch(loginRequested(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
