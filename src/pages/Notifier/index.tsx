import { Button } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useSnackbar } from 'notistack';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import actions from '../../redux/alerts/actionCreators';
import { Alert } from '../../redux/alerts/reducer';
import { State } from '../../redux/rootReducer';
export interface Props {
  readonly alerts: Alert[];
  readonly removeSnackbar: typeof actions.removeSnackbar;
}

const Notifier = ({ removeSnackbar, alerts }: Props) => {
  const mounted = useRef(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const initialDisplayedIds: string[] = [];

  const [displayedIds, storeDisplayedIds] = useState(initialDisplayedIds);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      alerts.forEach((alert: Alert) => {
        if (!displayedIds.includes(alert.key)) {
          enqueueSnackbar(alert.message, {
            action: () => (
              <Button
                color="inherit"
                size="small"
                aria-label="Close"
                onClick={() => {
                  closeSnackbar(alert.key);

                  removeSnackbar(alert.key);
                }}
              >
                <CloseOutlinedIcon color="inherit" />
              </Button>
            ),
            onClose: (
              event: SyntheticEvent<Element, Event>,
              reason: string
            ) => {
              if (alert.onClose) {
                alert.onClose(event, reason);
              }
              closeSnackbar(alert.key);

              removeSnackbar(alert.key);
            },
            ...alert,
            ContentProps: {
              style: { overflowWrap: 'break-word', maxWidth: '400px' },
            },
          });

          storeDisplayedIds([...displayedIds, alert.key]);
        }
      });
    }
  });

  return null;
};

const mapStateToProps = ({ alerts }: State) => ({
  alerts,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeSnackbar: actions.removeSnackbar,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);
