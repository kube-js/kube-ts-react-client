import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import useStyles from './styles';

const SearchBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search online courses..."
        classes={{
          input: classes.inputInput,
          root: classes.inputRoot,
        }}
        inputProps={{ 'aria-label': 'Search' }}
      />
    </div>
  );
};

export default SearchBox;
