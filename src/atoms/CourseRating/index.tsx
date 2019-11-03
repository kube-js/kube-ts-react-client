import Rating from '@material-ui/lab/Rating';
import React from 'react';
import useStyles from './styles';

export interface Options {
  readonly value: number;
  readonly label: string;
}

const PRECISION = 0.1;

const CourseRating = ({ label, value }: Options) => {
  const classes = useStyles();

  return (
    <div className={classes.rating}>
      <Rating
        classes={{
          iconEmpty: classes.iconEmpty,
        }}
        value={value}
        size="small"
        precision={PRECISION}
        readOnly
      />{' '}
      <div className={classes.ratingValue}>{label}</div>
    </div>
  );
};

export default CourseRating;
