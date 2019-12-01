import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import StripeInput from '../StripeInput';

interface Props {
  readonly component: any;
  readonly label: string;
  readonly id: string;
  readonly name: string;
  readonly fullWidth?: boolean;
}

const StripeElementWrapper = ({
  component,
  fullWidth = true,
  label,
  ...otherProps
}: Props) => {
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(true);
  const [focused, setFocused] = useState(false);

  const handleChange = (changeObj: any) => {
    setError(changeObj.error);
    setEmpty(changeObj.empty);
  };

  const handleFocus = (e: any) => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const hasError = Boolean(error);

  return (
    <TextField
      fullWidth={fullWidth}
      variant="outlined"
      error={hasError}
      label={label}
      InputLabelProps={{
        error: hasError,
        focused,
        shrink: focused || !empty,
      }}
      InputProps={{
        inputComponent: StripeInput,
        inputProps: {
          component,
          onBlur: handleBlur,
          onFocus: handleFocus,
          placeholder: '',
        },
        onChange: handleChange,
      }}
      helperText={hasError ? (error as any).message : null}
      {...otherProps}
    />
  );
};

export default StripeElementWrapper;
