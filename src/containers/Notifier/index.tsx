import { Button } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useSnackbar } from 'notistack';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import actions from '../../redux/notifications/actionCreators';
import { Notification } from '../../redux/notifications/reducer';
import { State } from '../../redux/rootReducer';
export interface Props {
  readonly closeNotification: any;
  readonly removeSnackbar: any;
  readonly notifications: Notification[];
}

const Notifier = ({
  closeNotification,
  removeSnackbar,
  notifications,
}: Props) => {
  const mounted = useRef(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const initialDisplayedIds: string[] = [];

  const [displayedIds, storeDisplayedIds] = useState(initialDisplayedIds);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      notifications.forEach((notification: Notification) => {
        if (!displayedIds.includes(notification.key)) {
          enqueueSnackbar(notification.message, {
            action: () => (
              <Button
                color="inherit"
                onClick={() => {
                  closeNotification(notification.key);
                  closeSnackbar(notification.key);
                  // removeSnackbar(notification.key);
                }}
              >
                <CloseOutlinedIcon color="inherit" /> close
              </Button>
            ),
            onClose: (
              event: SyntheticEvent<Element, Event>,
              reason: string
            ) => {
              if (notification.onClose) {
                notification.onClose(event, reason);
              }
              // Dispatch action to remove snackbar from redux store
              closeNotification(notification.key);
            },
            ...notification,
          });

          storeDisplayedIds([...displayedIds, notification.key]);
        } else if (notification.dismissed) {
          closeSnackbar(notification.key);
          removeSnackbar(notification.key);
        }
      });
    }
  });

  return null;
};

const mapStateToProps = ({ notifications }: State) => ({
  notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      closeNotification: actions.closeSnackbar,
      removeSnackbar: actions.removeSnackbar,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);
