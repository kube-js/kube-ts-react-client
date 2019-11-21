
import { Container } from '@material-ui/core';
import React, { memo } from 'react';
import { useParams } from 'react-router';
import useStyles from './styles';

const InstructorView = () => {
  const classes = useStyles();

  const  params = useParams<{username?: string}>();

  const username = params.username !== undefined ? params.username : 'username';

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg">
        <h2>{username}</h2>
      </Container>
    </div>
  );
};

export default memo(InstructorView);
