import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RemindPasswordForm, { RemindPasswordValues } from '../../components/RemindPasswordForm';
import {
  remindPasswordRequested,
} from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ auth: { remindPasswordLoading, remindPasswordError } }: State) => ({
  remindPasswordError,
  remindPasswordLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  remindPassword: (values: RemindPasswordValues) =>
    dispatch(remindPasswordRequested(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemindPasswordForm);
