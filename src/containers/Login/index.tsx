import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import LoginForm from '../../components/LoginForm';
import { loginRequested } from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ auth }: State) => ({
  error: auth.error,
  token: auth.token,
  user: auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: bindActionCreators(loginRequested, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
