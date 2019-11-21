import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CoursesSlider from '../../components/CoursesSlider';
import CoursesTabs from '../../components/CoursesTabs';
import HeroContent from '../../components/HeroContent';
import { getDiscoveryItemsRequested } from '../../redux/discoveryItems/actionCreators';
import { State } from '../../redux/rootReducer';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { bestSellers, mostViewed } = useSelector(
    ({ discoveryItems }: State) => discoveryItems
  );

  const dispatch = useDispatch();

  const getDiscoveryItems = () => dispatch(getDiscoveryItemsRequested());

  useEffect(() => {
    const shouldFetchData = [
      bestSellers.courses,
      bestSellers.categories,
      mostViewed.courses,
    ].some(items => items.length === 0);
    if (shouldFetchData) {
      getDiscoveryItems();
    }
  }, []);

  return (
    <Fragment>
      <HeroContent />

      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography
          component="h4"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {t('home.exploreOurBestsellers')}
        </Typography>

        <CoursesTabs
          courses={bestSellers.courses}
          categories={bestSellers.categories}
        />
      </Container>

      <Container className={classes.cardGrid} maxWidth="md">
        <Typography
          component="h4"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {t('home.studentAreViewing')}
        </Typography>

        <CoursesSlider courses={mostViewed.courses} />
      </Container>
    </Fragment>
  );
};

export default Home;
