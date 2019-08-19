import { Box } from '@material-ui/core';
import React from 'react';

export interface Props {
  readonly children: any;
}

const ErrorMessage = ({ children, ...props }: Props) => (
  <Box
    bgcolor="pink"
    border="1px solid red"
    padding="10px"
    borderRadius="3px"
    display="flex"
    alignItems="center"
    {...props}
  >
    {children}
  </Box>
);

export default ErrorMessage;
