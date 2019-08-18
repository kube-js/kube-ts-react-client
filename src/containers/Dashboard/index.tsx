import Button from '@material-ui/core/Button';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  closeSnackbar,
  enqueueSnackbar,
} from '../../redux/notifications/actionCreators';

const Dashboard = (props: any) => {
  const handleClick = () => {
    // NOTE:
    // if you want to be able to dispatch a `closeSnackbar` action later on,
    // you SHOULD pass your own `key` in the options. `key` can be any sequence
    // of number or characters, but it has to be unique to a given snackbar.
    const key = (new Date().getTime() + Math.random()).toString();
    const types = ['warning', 'success', 'error'];
    props.enqueueSnackbar({
      action: () => (
        <Button onClick={() => props.closeSnackbar(key)}>dissmiss me</Button>
      ),
      message: 'Failed fetching data.',

      key,
      // tslint:disable-next-line:no-magic-numbers
      variant: types[Math.floor(Math.random() * 3)],
    });
  };

  const handleDimissAll = () => {
    props.closeSnackbar();
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleClick}>Display snackbar</button>

      <button onClick={handleDimissAll}>Dismiss all snackbars</button>
    </div>
  );
};

// export default Dashboard;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeSnackbar: (key: string) => dispatch(closeSnackbar(key)),
  enqueueSnackbar: (props: any) =>
    dispatch(
      enqueueSnackbar({
        action: () => <h1>TEST</h1>,
        dismissed: false,
        key: (new Date().getTime() + Math.random()).toString(),
        message: 'TEMAT',
        ...props,
      })
    ),
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
