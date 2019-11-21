import { Container } from '@material-ui/core';
import React from 'react';
import RegisterForm from '../../components/RegisterForm';

const Register = () => (
  <Container component="main" maxWidth="xs" style={{ padding: 48 }}>
    <RegisterForm />
  </Container>
);

export default Register;
