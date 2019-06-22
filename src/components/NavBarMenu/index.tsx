import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';

export interface Props {
  readonly id?: string;
  readonly anchorEl?: null | Element | ((element: Element) => Element);
  readonly open: boolean;
  readonly onClose?: any;
}

const NavBarMenu = ({ id, anchorEl, open, onClose, ...otherProps }: Props) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={id}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={open}
    onClose={onClose}
    {...otherProps}
  >
    <MenuItem onClick={onClose}>Profile</MenuItem>
    <MenuItem onClick={onClose}>My account</MenuItem>
  </Menu>
);

export default NavBarMenu;
