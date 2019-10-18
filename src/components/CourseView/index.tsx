// tslint:disable:no-magic-numbers
import { Avatar, Button, Container, Grid, Paper } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { ROOT } from '../../constants/routes';
import { getCourseDetailsRequested } from '../../redux/courseDetails/actionCreators';
import { State } from '../../redux/rootReducer';
import assetsUrl from '../../utils/helpers/assetsUrl';
import useStyles from './styles';

export interface Params {
  readonly courseSlug: string;
}

const CourseView = ({ match }: RouteComponentProps<Params>) => {
  const classes = useStyles();

  if (match.params.courseSlug.trim() === '') {
    return <Redirect to={ROOT} />;
  }
  const { course, getCourseDetailsLoading } = useSelector(
    (state: State) => state.courseDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseDetailsRequested(match.params.courseSlug));
  }, [match.params.courseSlug]);

  if (getCourseDetailsLoading || course === undefined) {
    // TODO: make course placeholder
    return <div>Loading...</div>;
  }

  const coursePrice = Number(Math.random() * 10 + 9).toFixed(2);

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <Paper className={classes.paper}>
              <h3>{course.title}</h3>
              <h4>
                <Avatar className={classes.avatar}>
                  {`${(course.user.firstName as string).substr(0, 1)}${(course
                    .user.lastName as string).substr(0, 1)}`}
                </Avatar>
                {course.user.firstName} {course.user.lastName}
              </h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: course.description as string,
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}>
              <img src={assetsUrl(course.imageUrl)} style={{ width: '100%' }} />
              <h4>{`£${coursePrice}`}</h4>
              <Button variant="contained" fullWidth color="primary">
                Add to cart
              </Button>
              <Button variant="contained" fullWidth color="secondary">
                Buy now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default memo(CourseView);
