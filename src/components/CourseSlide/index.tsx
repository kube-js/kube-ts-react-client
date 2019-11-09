import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import _find from 'ramda/src/find';
import _isNil from 'ramda/src/isNil';
import _propEq from 'ramda/src/propEq';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// tslint:disable:no-import-side-effect
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// TODO: check slow rendering issue
// import CourseRating from '../../atoms/CourseRating';
import courseImagePlaceholder from '../../images/course_400x180.png';
import { EnhancedCourse } from '../../redux/discoveryItems/actionCreators';
import assetsUrl from '../../utils/helpers/assetsUrl';

const Slide = ({
  course,
  classes,
}: {
  classes: any;
  course: EnhancedCourse;
}) => {
  const { t } = useTranslation();
  // TODO: get real rating and price
  // const courseRating = Number((Math.random() * 5).toFixed(1));
  // tslint:disable-next-line:no-magic-numbers
  const coursePrice = Number(Math.random() * 10 + 9).toFixed(2);

  const imageUrl = !_isNil(course.imageUrl) ? assetsUrl(course.imageUrl) : courseImagePlaceholder;

  return (
    <Card className={classes.card}>
      <Link className={classes.courseLink} to={`/courses/${course.slug}`}>
        <CardMedia
          className={classes.cardMedia}
          image={imageUrl}
          title={course.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="subtitle1"
            component="div"
            className={classes.cardTitle}
          >
            {course.title}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            component="div"
            className={classes.cardInstructorTitle}
          >
            {course.user.firstName} {course.user.lastName}
          </Typography>

          {/* <CourseRating value={courseRating} /> */}

          <div className={classes.cardPrice}>{`£${coursePrice}`}</div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            style={{ textTransform: 'capitalize' }}
          >
            {t('cart.addToCart')}
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
};

export default Slide;