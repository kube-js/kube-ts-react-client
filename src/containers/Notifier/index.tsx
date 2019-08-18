import { withSnackbar, WithSnackbarProps } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { removeSnackbar } from '../../redux/notifications/actionCreators';
import { Notification } from '../../redux/notifications/reducer';
import { State } from '../../redux/rootReducer';

export interface Props extends WithSnackbarProps {
  readonly enqueueSnackbar: any;
  readonly notifications: Notification[];
}

const Notifier = ({ closeSnackbar, enqueueSnackbar, notifications }: Props) => {
  const mounted = useRef(false);

  const initialDisplayedIds: string[] = [];

  const [displayedIds, storeDisplayedIds] = useState(initialDisplayedIds);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      notifications.forEach((notification: Notification) => {
        if (!displayedIds.includes(notification.key)) {
          enqueueSnackbar(notification.message, {
            onClose: (event: any, reason: any, key: any) => {
              if (notification.onClose) {
                notification.onClose(event, reason, key);
              }
              // Dispatch action to remove snackbar from redux store
              removeSnackbar(notification.key);
            },
            variant: 'warning',
            ...notification,
            dismissed: notification.dismissed.toString(),
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
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps
  // tslint:disable-next-line:max-file-line-count
)(Notifier) as any);
