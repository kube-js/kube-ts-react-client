import { Container } from '@material-ui/core';
import React from 'react';
import LoginForm from '../../components/LoginForm';

const Login = () => (
  <Container component="main" maxWidth="xs" style={{padding: 48}}>
    <LoginForm />
  </Container>
);

export default Login;
