// tslint:disable:no-magic-numbers
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import _isNil from 'ramda/src/isNil';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import CourseMetaInfo from '../../atoms/CourseMetaInfo';
import CourseSections from '../../atoms/CourseSections';
import courseImagePlaceholder from '../../images/course_400x180.png';
import { getCourseDetailsRequested } from '../../redux/courseDetails/actionCreators';
import { State } from '../../redux/rootReducer';
import assetsUrl from '../../utils/helpers/assetsUrl';
import useStyles from './styles';

export interface Params {
  readonly courseSlug: string;
}
const CourseView = ({ match }: RouteComponentProps<Params>) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { course, getCourseDetailsLoading } = useSelector(
    (state: State) => state.courseDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (course === undefined || course.slug !== match.params.courseSlug) {
      dispatch(getCourseDetailsRequested(match.params.courseSlug));
    }
  }, [match.params.courseSlug]);

  if (getCourseDetailsLoading || course === undefined) {
    // TODO: make course placeholder
    return <div>{t('global.loading')}</div>;
  }
  const imageUrl = !_isNil(course.imageUrl)
    ? assetsUrl(course.imageUrl)
    : courseImagePlaceholder;
  const coursePrice = Number(Math.random() * 10 + 9).toFixed(2);
  const sections = course.sections.map(section => ({
    ...section,
    units: [
      {
        title: 'Introduction and the goal of this course',
      },
      {
        title: 'V8 Under the Hood',
      },
      {
        title: 'The Javascript Core',
      },
      {
        title: 'RESTful APIs and JSON',
      },
    ],
  }));

  return (
    <div className={classes.root}>
      <Container component="div" className={classes.metaInfo} maxWidth={false}>
        <Container component="div" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <CourseMetaInfo course={course} />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.metaInfoSidebar}>
              <Paper className={[classes.sidebarCard, classes.paper].join(' ')}>
                <img src={imageUrl} style={{ width: '100%' }} />

                <Typography variant="h4" style={{margin: '15px 0'}}>{`£${coursePrice}`}</Typography>

                <Button variant="contained" fullWidth color="primary" style={{marginBottom: '5px'}}>
                  {t('cart.addToCart')}
                </Button>
                
                <Button variant="contained" fullWidth color="secondary">
                  {t('cart.buyNow')}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <Typography variant="h3" className={classes.contentHeadline}>
              {t('courseView.learningContent')}
            </Typography>

            <CourseSections sections={sections} />
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default memo(CourseView);
