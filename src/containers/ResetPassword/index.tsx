import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import {
  ResetPasswordOptions,
  resetPasswordRequested,
} from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ auth: { resetPasswordLoading, resetPasswordError } }: State) => ({
  resetPasswordError,
  resetPasswordLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPassword: (options: ResetPasswordOptions) =>
    dispatch(resetPasswordRequested(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm);
