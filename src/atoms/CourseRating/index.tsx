import Rating from '@material-ui/lab/Rating';
import React from 'react';
import useStyles from './styles';

export interface Options {
  readonly value: number;
}

const PRECISION = 0.1;

const CourseRating = ({ value }: Options) => {
  const classes = useStyles();

  return (
    <div className={classes.rating}>
      <Rating value={value} size="small" precision={PRECISION} readOnly />{' '}
      <div className={classes.ratingValue}>{value}</div>
    </div>
  );
};

export default CourseRating;
