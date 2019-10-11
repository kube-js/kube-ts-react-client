import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect } from 'react';
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
  discoveryItems: { bestSellers, mostViewed, getDiscoveryItemsLoading },
  getDiscoveryItems,
}: Options) => {
  const classes = useStyles();

  useEffect(() => {
    // TODO: fetch resources with nested models
    getDiscoveryItems();
  }, [bestSellers.courses.length, mostViewed.courses.length]);

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
          Explore our bestsellers
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
          Students are viewing
        </Typography>

        <CoursesSlider courses={mostViewed.courses} />
      </Container>
    </Fragment>
  );
};

// tslint:disable-next-line:max-file-line-count
export default Home;
