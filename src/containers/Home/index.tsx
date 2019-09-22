import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Home from '../../components/Home';
import { getCategoriesRequested } from '../../redux/categories/actionCreators';
import { getCoursesRequested } from '../../redux/courses/actionCreators';
import { State } from '../../redux/rootReducer';
import { getUsersRequested } from '../../redux/users/actionCreators';

const mapStateToProps = ({ categories, courses, users }: State) => ({
  categories,
  courses,
  users,
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
  getUsers: () =>
    dispatch(
      // TODO: implement redux hooks
      getUsersRequested()
    ),
});

// TODO: how redux connect compare to hooks
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // tslint:disable-next-line:max-file-line-count
)(Home);
