import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, useEffect } from 'react';
import { getDiscoveryItemsRequested } from '../../redux/discoveryItems/actionCreators';
import { DiscoveryItemsState } from '../../redux/discoveryItems/reducer';
import CoursesSlider from '../CoursesSlider';
import CoursesTabs from '../CoursesTabs';
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
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Learn without limits
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className={classes.heroButtons}>
            {/* tslint:disable-next-line:no-magic-numbers */}
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="secondary">
                  Browse online courses
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Join for free
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
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
