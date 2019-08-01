import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RegisterForm from '../../components/RegisterForm';
import {
  RegisterOptions,
  registerRequested,
} from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ auth: { registerLoading } }: State) => ({
  registerLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  register: (options: RegisterOptions) =>
    dispatch(registerRequested(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
