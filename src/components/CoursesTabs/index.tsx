// tslint:disable:no-magic-numbers
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import _pluck from 'ramda/src/pluck';
import React from 'react';
import { EnhancedCourse } from '../../redux/discoveryItems/actionCreators';
import Category from '../../types/items/Category';
import CoursesSlider from '../CoursesSlider';

export interface TabPanelOptions {
  readonly children: React.ReactNode;
  readonly index: number;
  readonly value: number;
}

const TabPanel = ({ children, value, index, ...other }: TabPanelOptions) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
  >
    <Box p={3}>{children}</Box>
  </Typography>
);

const a11yProps = (index: number) => ({
  'aria-controls': `vertical-tabpanel-${index}`,
  id: `vertical-tab-${index}`,
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export interface Options {
  readonly categories: Category[];
  readonly courses: EnhancedCourse[];
}

const getCoursesByCategoryId = (
  courses: EnhancedCourse[],
  categoryId: string
) => courses.filter(course => course.categoryId === categoryId);

const CoursesTabs = ({ categories, courses }: Options) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);

  // tslint:disable-next-line:variable-name
  function handleChange(_event: any, newValue: any) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs
        centered={false}
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {categories.map((category: Category, index: number) => (
          <Tab key={category.id} label={category.title} {...a11yProps(index)} />
        ))}
      </Tabs>
      {categories.map((category: Category, index: number) => (
        <TabPanel value={value} key={category.id} index={index}>
          {/* TODO: redux selectors? */}
          <CoursesSlider
            courses={getCoursesByCategoryId(courses, category.id)}
          />
        </TabPanel>
      ))}
    </div>
  );
};

export default CoursesTabs;
