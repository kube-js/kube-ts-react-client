import React from 'react';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

export interface Options {
  readonly value: number;
}

const CourseRating = ({ value }: Options) => {
  const classes = useStyles();

  return (
    <div className={classes.rating}>
      <Rating value={value} size="small" precision={0.1} readOnly />{' '}
      <div className={classes.ratingValue}>{value}</div>
    </div>
  );
};

export default CourseRating;
