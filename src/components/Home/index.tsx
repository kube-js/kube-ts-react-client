import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getDiscoveryItemsRequested } from '../../redux/discoveryItems/actionCreators';
import { DiscoveryItemsState } from '../../redux/discoveryItems/reducer';
import CoursesSlider from '../CoursesSlider';
import CoursesTabs from '../CoursesTabs';
import HeroContent from '../HeroContent';
import useStyles from './styles';

export interface Options {
  readonly discoveryItems: DiscoveryItemsState;
  readonly getDiscoveryItems: () => ReturnType<
    typeof getDiscoveryItemsRequested
  >;
}

const Home = ({
  discoveryItems: { bestSellers, mostViewed },
  getDiscoveryItems,
}: Options) => {
  const classes = useStyles();
  const { t } = useTranslation();

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

// tslint:disable-next-line:max-file-line-count
export default Home;
