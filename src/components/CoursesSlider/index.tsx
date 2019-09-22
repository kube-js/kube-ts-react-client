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

const Slide = ({ course, user, classes, ...props }: any) => (
  <Card className={classes.card} {...props}>
    <CardMedia
      className={classes.cardMedia}
      image={course.imageUrl}
      title="Image title"
    />
    <CardContent className={classes.cardContent}>
      <Typography gutterBottom variant="subtitle1" component="h4">
        {course.title}
      </Typography>

      {user !== undefined ? (
        <Typography variant="body2" color="textSecondary" component="p">
          {user.firstName} {user.lastName}
        </Typography>
      ) : null}
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        Enroll
      </Button>
    </CardActions>
  </Card>
);

const CoursesSlider = ({ courses, users }: Options) => {
  const classes = useStyles();

  const settings = {
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

          return <Slide {...{ course, classes, user }} />;
        })}
      </Slider>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CoursesSlider;
