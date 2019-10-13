// tslint:disable:no-magic-numbers
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Downshift from 'downshift';
import React from 'react';
import useStyles from './styles';

const suggestions = [
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
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

let popperNode: any;

const Autocomplete = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Downshift id="downshift-popper">
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'What would you like to learn?',
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
                ref: (node: any) => {
                  popperNode = node;
                },
              })}
              {String(inputProps.value).length > 0 && (
                <div className={[classes.icon, classes.closeIcon].join(' ')}>
                  <CloseIcon />
                </div>
              )}
              <Popper open={isOpen} anchorEl={popperNode}>
                <div
                  {...(isOpen
                    ? getMenuProps({}, { suppressRefError: true })
                    : {})}
                >
                  <Paper
                    square
                    style={{
                      marginTop: 8,
                      width: popperNode ? popperNode.clientWidth : undefined,
                    }}
                  >
                    {(getSuggestions(inputValue) as any).map(
                      (suggestion: any, index: number) =>
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

