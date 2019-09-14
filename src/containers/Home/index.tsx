import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Home from '../../components/Home';
import { getCategoriesRequested } from '../../redux/categories/actionCreators';
import { getCoursesRequested } from '../../redux/courses/actionCreators';
import { State } from '../../redux/rootReducer';

const mapStateToProps = ({ categories, courses }: State) => ({
  categories,
  courses,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCategories: () =>
    dispatch(
      // TODO: implement redux hooks
      getCategoriesRequested()
    ),
  getCourses: () =>
    dispatch(
      // TODO: implement redux hooks
      getCoursesRequested()
    ),
});

// TODO: how redux connect compare to hooks
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // tslint:disable-next-line:max-file-line-count
)(Home);
