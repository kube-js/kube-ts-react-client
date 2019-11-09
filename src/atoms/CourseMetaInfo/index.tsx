import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EnhancedCourse } from '../../redux/discoveryItems/actionCreators';
import CourseRating from '../CourseRating';
import useStyles from './styles';

export interface Options {
  readonly course: EnhancedCourse;
}

const CourseMetaInfo = ({ course }: Options) => {
  const classes = useStyles();
  const { t } = useTranslation();
  // TODO: get the real value
  const courseRating = 3.5;
  const courseLabel = `${courseRating} (1132 ratings)`;
  
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.mainHeadline}>
        {course.title}
      </Typography>
      
      <CourseRating value={courseRating} label={courseLabel} />

      <Typography variant="h3" className={classes.autorInfo}>
        {t('courseView.instructor')}: {course.user.firstName} {course.user.lastName}
      </Typography>

    </div>
  );
};

export default CourseMetaInfo;
