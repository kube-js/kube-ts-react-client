// tslint:disable:no-magic-numbers
import { Badge, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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

const CartDropdown = () => {
  // TODO: refactor component
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center'}}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        color="inherit"
        onClick={handleClick}
      >
        <Badge
          badgeContent={2}
          color="secondary"
        >
          <ShoppingCartIcon />
        </Badge>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography style={{padding: 10}}>Learn React from scratch - £17.99</Typography>
      </StyledMenu>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CartDropdown;
