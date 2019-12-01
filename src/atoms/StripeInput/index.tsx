import { fade, useTheme } from '@material-ui/core/styles';
import React from 'react';

const StripeInput = (props: any) => {
  const {
    component: Component,
    inputRef,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribeBy,
    defaultValue,
    required,
    onKeyDown,
    onKeyUp,
    readOnly,
    autoComplete,
    autoFocus,
    type,
    name,
    rows,
    ...other
  } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = React.useState<any>(null);

  React.useImperativeHandle(
    inputRef,
    () => ({
      focus: () => {
        mountNode.focus();
      },
    }),
    [mountNode]
  );

  return (
    <Component
      onReady={setMountNode}
      style={{
        base: {
          '::placeholder': {
            // tslint:disable-next-line:no-magic-numbers
            color: fade(theme.palette.text.primary, 0.42),
          },
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          fontSize: `${theme.typography.fontSize}px`,
        },
        invalid: {
          color: theme.palette.text.primary,
        },
      }}
      {...other}
    />
  );
}

export default StripeInput;