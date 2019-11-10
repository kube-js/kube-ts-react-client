import { Container, Link, Typography } from '@material-ui/core';
import React from 'react';
import LanguageDropdown from '../../atoms/LanguageDropdown';
import useStyles from './styles';

const Copyright = () => (
  <Typography variant="body2" color="inherit" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
      Kudemy
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <LanguageDropdown />
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
