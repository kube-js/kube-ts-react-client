import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Slider from 'react-slick';
// tslint:disable:no-import-side-effect
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Course from '../../types/items/Course';
import useStyles from './styles';

const CoursesSlider = ({ courses }: { courses: Course[] }) => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    className: 'center',
    infinite: true,
    lazyLoad: 'ondemand' as any,
    slidesToShow: 3,
    speed: 500,
  };

  const classes = useStyles();

  return (
    <div style={{ maxWidth: '800px' }}>
      <Slider {...settings} className="test">
        {courses.map(course => (
          <div key={course.id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={course.imageUrl}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="subtitle1" component="h4">
                  {course.title}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  {course.userId}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Enroll
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CoursesSlider;
