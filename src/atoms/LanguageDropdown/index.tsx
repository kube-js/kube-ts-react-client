import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';
import { useTranslation } from 'react-i18next';

import React from 'react';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      horizontal: 'center',
      vertical: 'bottom',
    }}
    transformOrigin={{
      horizontal: 'center',
      vertical: 'top',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
      backgroundColor: theme.palette.primary.main,
    },
  },
}))(MenuItem);

const langLabels: { [keyof: string]: string } = {
  'en-GB': 'English',
  'pl-PL': 'Polski',
};

const LanguageDropdown = () => {
  // TODO: refactor component
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { i18n } = useTranslation();

  const currentLang = Array.isArray(i18n.languages)
    ? i18n.languages[0]
    : i18n.languages;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
      >
        <LanguageIcon style={{ marginRight: '5' }} /> {langLabels[currentLang]}{' '}
        <ExpandMoreIcon style={{ marginLeft: '5' }} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => changeLanguage('en-GB')}>
          <ListItemText primary={langLabels['en-GB']} />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => changeLanguage('pl-PL')}>
          <ListItemText primary={langLabels['pl-PL']} />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default LanguageDropdown;
