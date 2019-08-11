import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import VerifyAccount from '../../components/VerifyAccount';
import {
  VerifyAccountOptions,
  verifyAccountRequested,
} from '../../redux/auth/actionCreators/index';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({
  auth: { verifyAccountLoading, verifyAccountError },
}: State) => ({
  verifyAccountError,
  verifyAccountLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  verifyAccount: (values: VerifyAccountOptions) =>
    dispatch(verifyAccountRequested(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyAccount);
