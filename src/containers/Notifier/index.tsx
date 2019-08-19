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
  readonly markAsDismissed: typeof actions.closeSnackbar;
  readonly notifications: Notification[];
  readonly removeSnackbar: typeof actions.removeSnackbar;
}

const Notifier = ({ markAsDismissed, notifications }: Props) => {
  const mounted = useRef(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const initialDisplayedIds: string[] = [];

  const [displayedIds, storeDisplayedIds] = useState(initialDisplayedIds);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      notifications.forEach(({ dismissed, ...notification }: Notification) => {
        if (!displayedIds.includes(notification.key)) {
          enqueueSnackbar(notification.message, {
            action: () => (
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  closeSnackbar(notification.key);

                  // dissmiss notification in redux store
                  markAsDismissed(notification.key);
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
              closeSnackbar(notification.key);

              // dissmiss notification in redux store
              markAsDismissed(notification.key);
            },
            ...notification,
            ContentProps: {
              style: { overflowWrap: 'break-word', width: '250px' },
            },
          });

          storeDisplayedIds([...displayedIds, notification.key]);
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
      markAsDismissed: actions.closeSnackbar,
      removeSnackbar: actions.removeSnackbar,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);
