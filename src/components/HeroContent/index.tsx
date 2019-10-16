// tslint:disable:no-magic-numbers
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Autocomplete from '../../atoms/Autocomplete';
import { autocompleteRequested } from '../../redux/autocomplete/actionCreators';
import { State } from '../../redux/rootReducer';
import Course from '../../types/items/Course';
import User from '../../types/items/User';
import useStyles from './styles';

const initialResults = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function getSuggestions(
  value: string | null,
  { showEmpty }: { showEmpty: boolean } = { showEmpty: false }
) {
  const inputValue = String(value)
    .trim()
    .toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : initialResults.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

export interface GetFormattedResultsOptions {
  readonly courses: Course[];
  readonly users: User[];
}

const getFormattedResults = ({
  courses,
  users,
}: GetFormattedResultsOptions) => {
  const updatedCourses = courses
    .map((course: Course) => ({
      ...course,
      label: course.title,
      type: 'course',
    }))
    .slice(0, 4);
  const updatedUsers = users
    .map((user: User) => ({
      ...user,
      label: [user.firstName, user.lastName].every(Boolean)
        ? `${user.firstName} ${user.lastName}`
        : user.email,
      type: 'user',
    }))
    .slice(0, 2);

  return [...updatedCourses, ...updatedUsers];
};

const HeroContent = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const history = useHistory();
  const { courses, users } = useSelector((state: State) => state.autocomplete);

  const dispatch = useDispatch();
  const results = getFormattedResults({ courses, users });

  const handleChange = (changes: any) => {
    // TODO: abstract this operations
    if (changes.hasOwnProperty('selectedItem')) {
      setValue(changes.selectedItem);

      const item: any = results.filter(
        result => result.label === changes.selectedItem
      )[0];

      const link =
        item.type === 'course'
          ? `/courses/${item.slug}`
          : `/instructors/${item.email}`;

      history.push(link);
    } else if (changes.hasOwnProperty('inputValue')) {
      setValue(changes.inputValue);
      dispatch(autocompleteRequested(changes.inputValue));
    }
  };

  return (
    <div className={classes.heroContainer}>
      <Container className={classes.heroContent} maxWidth="sm">
        <Grid item md={12} sm={12}>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ color: '#fff' }}
          >
            Learn without limits
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            style={{ color: '#fff' }}
          >
            Find any course and topic and start learning today.
          </Typography>
          <div className={classes.searchBox}>
            <Autocomplete
              value={value}
              onChange={handleChange}
              suggestions={results}
            />
          </div>
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default HeroContent;
