import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import _find from 'ramda/src/find';
import _propEq from 'ramda/src/propEq';
import React from 'react';
import Slider from 'react-slick';
// tslint:disable:no-import-side-effect
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { EnhancedCourse } from '../../redux/discoveryItems/actionCreators';
import CourseSlide from '../CourseSlide';
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
  readonly courses: EnhancedCourse[];
}

// Make reusable
const CoursesSlider = ({ courses }: Options) => {
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
      {/** TODO: create slider placeholder */}
      <Slider {...settings} className={classes.slider}>
        {courses.map(course => (
          <CourseSlide {...{ course }} key={course.id} />
        ))}
      </Slider>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CoursesSlider;
