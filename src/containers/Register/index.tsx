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
  register: ({ firstName, lastName, email, password }: RegisterOptions) =>
    dispatch(registerRequested({ firstName, lastName, email, password })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
