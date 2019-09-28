import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import _find from 'ramda/src/find';
import _propEq from 'ramda/src/propEq';
import React from 'react';
import Slider from 'react-slick';
// tslint:disable:no-import-side-effect
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Course from '../../types/items/Course';
import User from '../../types/items/User';
import CourseRating from '../CourseRating';
import useStyles from './styles';

const NextArrow = (props: any) => {
  const { classes, style, onClick } = props;

  // TODO: sort out props
  return (
    <ChevronRightIcon
      className={`${classes.arrow} ${classes.nextArrow}`}
      style={style}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { classes, style, onClick } = props;

  // TODO: sort out props

  return (
    <ChevronLeftIcon
      className={`${classes.arrow} ${classes.prevArrow}`}
      style={style}
      onClick={onClick}
    />
  );
};
export interface Options {
  readonly courses: Course[];
  readonly users: User[];
}

const getUserById = ({
  users,
  id,
}: {
  users: User[];
  id: string;
}): User | undefined => _find(_propEq('id', id))(users);


// TODO: extract to separate component
const Slide = ({ course, user, classes }: any) => {
  // TODO: get real rating and price
  const courseRating = Number((Math.random() * 5).toFixed(1));
  // tslint:disable-next-line:no-magic-numbers
  const coursePrice = Number((Math.random() * 10) + 9).toFixed(2);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={course.imageUrl}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="subtitle1"
          component="div"
          className={classes.cardTitle}
        >
          {course.title}
        </Typography>

        {user !== undefined ? (
          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            className={classes.cardInstructorTitle}
          >
            {user.firstName} {user.lastName}
          </Typography>
        ) : null}

        <CourseRating value={courseRating} />


        <div className={classes.cardPrice}>{`£${coursePrice}`}</div>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          style={{ textTransform: 'capitalize' }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

// Make reusable
const CoursesSlider = ({ courses, users }: Options) => {
  const classes = useStyles();

  const settings = {
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '60px',
    className: 'center',
    infinite: true,
    lazyLoad: 'ondemand' as any,
    nextArrow: <NextArrow classes={classes} />,
    prevArrow: <PrevArrow classes={classes} />,
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <Slider {...settings} className={classes.slider}>
        {courses.map(course => {
          const user = getUserById({ users, id: course.userId });

          return <Slide {...{ course, classes, user }} key={course.id} />;
        })}
      </Slider>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CoursesSlider;
