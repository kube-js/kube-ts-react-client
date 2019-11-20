import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Home from '../../components/Home';
import { getDiscoveryItemsRequested } from '../../redux/discoveryItems/actionCreators';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ discoveryItems }: State) => ({
  discoveryItems,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDiscoveryItems: () =>
    dispatch(
      // TODO: implement redux hooks
      getDiscoveryItemsRequested()
    ),
});

// TODO: how redux connect compare to hooks
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // tslint:disable-next-line:max-file-line-count
)(Home);
