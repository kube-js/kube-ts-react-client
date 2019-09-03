import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import VerifyAccount from '../../components/VerifyAccount';
import {
  ResendVerifyTokenOptions,
  resendVerifyTokenRequested,
} from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({
  auth: { resendVerifyTokenLoading, resendVerifyTokenError },
}: State) => ({
  resendVerifyTokenError,
  resendVerifyTokenLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resendVerifyToken: (values: ResendVerifyTokenOptions) =>
    dispatch(resendVerifyTokenRequested(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyAccount);
