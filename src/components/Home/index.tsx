import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect } from 'react';
import { getCategoriesRequested } from '../../redux/categories/actionCreators';
import { CategoriesState } from '../../redux/categories/reducer';
import { getCoursesRequested } from '../../redux/courses/actionCreators';
import { CoursesState } from '../../redux/courses/reducer';
import { getUsersRequested } from '../../redux/users/actionCreators';
import { UsersState } from '../../redux/users/reducer';
import CoursesTabs from '../CoursesTabs';
import useStyles from './styles';

export interface Options {
  readonly users: UsersState;
  readonly courses: CoursesState;
  readonly categories: CategoriesState;
  readonly getCourses: () => ReturnType<typeof getCoursesRequested>;
  readonly getUsers: () => ReturnType<typeof getUsersRequested>;
  readonly getCategories: () => ReturnType<typeof getCategoriesRequested>;
}

const Home = ({
  categories,
  courses,
  users,
  getCategories,
  getCourses,
  getUsers,
}: Options) => {
  const classes = useStyles();

  useEffect(() => {
    // TODO: fetch resources with nested models
    getUsers();
    getCategories();
    getCourses();
  }, [courses.after, categories.after, users.after]);

  return (
    <Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Learn without limits
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className={classes.heroButtons}>
            {/* tslint:disable-next-line:no-magic-numbers */}
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="secondary">
                  Browse online courses
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Join for free
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="lg">
        {courses.items !== undefined &&
        categories.items !== undefined &&
        users.items !== undefined ? (
          <CoursesTabs
            courses={courses.items}
            categories={categories.items}
            users={users.items}
          />
        ) : null}
      </Container>
    </Fragment>
  );
};

export default Home;
