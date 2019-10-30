// tslint:disable:no-magic-numbers
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Downshift from 'downshift';
import _isNil from 'ramda/src/isNil';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { autocompleteRequested } from '../../redux/autocomplete/actionCreators';
import { State } from '../../redux/rootReducer';
import Course from '../../types/items/Course';
import User from '../../types/items/User';
import useStyles from './styles';

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

function renderInput(inputProps: any) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        classes: {
          input: classes.inputInput,
          root: classes.inputRoot,
        },
        inputRef: ref,
        ...InputProps,
      }}
      variant="outlined"
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps: any) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

type AutocompleteType = 'navbar' | 'heroContent';

const autocompleteOptions = {
  heroContent: {
    inputProps: {},
  },
  navbar: {
    inputProps: {
      style: {
        paddingBottom: '12px',
        paddingTop: '12px',
      },
    },
  },
};

interface Options {
  readonly id: string;
  readonly type: AutocompleteType;
}

const POPPER_OFFSET = 4;

const Autocomplete = ({ id, type }: Options) => {
  const classes = useStyles();

  const additionalOptions = autocompleteOptions[type];

  const popperNode: any = useRef({});

  const [value, setValue] = useState('');
  const history = useHistory();
  const { courses, users } = useSelector((state: State) => state.autocomplete);

  const dispatch = useDispatch();
  const results = getFormattedResults({ courses, users });

  const handleChange = (changes: any) => {
    // TODO: abstract this operations
    if (
      changes.hasOwnProperty('selectedItem') &&
      !_isNil(changes.selectedItem)
    ) {
      setValue(changes.selectedItem);

      const item: any = results.filter(
        result => result.label === changes.selectedItem
      )[0];

      const link =
        item.type === 'course'
          ? `/courses/${item.slug}`
          // TODO: create username property as uniq db field
          : `/instructors/${String(item.firstName + item.lastName).toLowerCase()}`;
      setValue('');
      history.push(link);
    } else if (changes.hasOwnProperty('inputValue')) {
      setValue(changes.inputValue);
      dispatch(autocompleteRequested(changes.inputValue));
    }
  };

  return (
    <div className={classes.root}>
      <Downshift id={id} selectedItem={value} onStateChange={handleChange}>
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'What would you like to learn?',
            ...additionalOptions.inputProps,
          });

          return (
            <div className={classes.container}>
              <div className={classes.icon}>
                <SearchIcon />
              </div>
              {renderInput({
                InputLabelProps: getLabelProps({ shrink: true } as any),
                InputProps: { onBlur, onFocus },
                classes,
                fullWidth: true,
                inputProps,
                ref: popperNode
              })}
              {String(inputProps.value).length > 0 && (
                <div className={[classes.icon, classes.closeIcon].join(' ')}>
                  <CloseIcon onClick={clearSelection as any} />
                </div>
              )}
              <Popper open={isOpen} anchorEl={popperNode.current} disablePortal>
                <div
                  {...(isOpen
                    ? getMenuProps({}, { suppressRefError: true })
                    : {})}
                >
                  <Paper
                    square
                    style={{
                      marginTop: '4px',
                      width: popperNode.current && popperNode.current.clientWidth ? popperNode.current.clientWidth - POPPER_OFFSET : undefined,
                    }}
                  >
                    {results.map((suggestion: any, index: number) =>
                      renderSuggestion({
                        highlightedIndex,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        selectedItem,
                        suggestion,
                      })
                    )}
                  </Paper>
                </div>
              </Popper>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
  // tslint:disable-next-line:max-file-line-count
};

// tslint:disable-next-line:max-file-line-count
export default Autocomplete;
