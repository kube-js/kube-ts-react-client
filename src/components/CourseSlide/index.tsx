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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// tslint:disable:no-import-side-effect
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// TODO: check slow rendering issue
// import CourseRating from '../../atoms/CourseRating';
import courseImagePlaceholder from '../../images/course_400x180.png';
import { addCartItem } from '../../redux/cart/actionCreators';
import { EnhancedCourse } from '../../redux/discoveryItems/actionCreators';
import { State } from '../../redux/rootReducer';
import assetsUrl from '../../utils/helpers/assetsUrl';
import useStyles from './styles';

const Slide = ({ course }: { course: EnhancedCourse }) => {
  const { t } = useTranslation();
  const { items } = useSelector((state: State) => state.cart);
  const classes = useStyles();
  // TODO: get real rating and price
  // const courseRating = Number((Math.random() * 5).toFixed(1));
  // tslint:disable-next-line:no-magic-numbers
  const coursePrice = Number(Math.random() * 10 + 9).toFixed(2);

  const imageUrl = !_isNil(course.imageUrl)
    ? assetsUrl(course.imageUrl)
    : courseImagePlaceholder;

  const dispatch = useDispatch();
  const history = useHistory();

  const addItem = (item: EnhancedCourse) => (e: any) => {
    e.preventDefault();
    dispatch(addCartItem(item));
    history.push({ pathname: '/cart', search: `?newItemId=${item.id}` });
  };

  const hasAddedToCart =
    items.find(item => item.id === course.id) !== undefined;

  return (
    <Card>
      <CardMedia
        className={classes.cardMedia}
        image={imageUrl}
        title={course.title}
      />
      <CardContent className={classes.cardContent}>
        <Link className={classes.courseLink} to={`/courses/${course.slug}`}>
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
        </Link>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {!hasAddedToCart ? (
          <Button
            size="small"
            color="primary"
            onClick={addItem(course)}
            className={classes.cartAction}
          >
            {t('cart.addToCart')}
          </Button>
        ) : null}

        {hasAddedToCart ? (
          <Typography className={classes.cartAction}>
            {t('cart.addedToCart')}
          </Typography>
        ) : null}
      </CardActions>
    </Card>
  );
};

// tslint:disable-next-line:max-file-line-count
export default Slide;
