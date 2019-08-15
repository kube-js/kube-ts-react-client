import { withSnackbar /* WithSnackbarProps */ } from 'notistack';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  // closeSnackbar,
  // enqueueSnackbar,
  removeSnackbar,
} from '../../redux/notifications/actionCreators';
import { Notification } from '../../redux/notifications/reducer';
import { State } from '../../redux/rootReducer';

export interface Props {
  readonly closeSnackbar: any;
  readonly enqueueSnackbar: any;
  readonly removeSnackbar: any;
  readonly notifications: Notification[];
}

class Notifier extends PureComponent<Props, {}> {
  private displayed: string[] = [];

  private storeDisplayed = (id: string) => {
    this.displayed = [...this.displayed, id];
  };

  // public shouldComponentUpdate({ notifications: newSnacks = [] }) {
  //   if (!newSnacks.length) {
  //     this.displayed = [];

  //     return false;
  //   }

  //   const { notifications: currentSnacks } = this.props;
  //   let notExists = false;

  //   // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < newSnacks.length; i += 1) {
  //     const newSnack = newSnacks[i];
  //     if (newSnack.dismissed) {
  //       this.props.closeSnackbar(newSnack.key);
  //       this.props.removeSnackbar(newSnack.key);
  //     }

  //     if (notExists) {
  //       continue;
  //     }

  //     notExists =
  //       notExists ||
  //       !currentSnacks.filter(({ key }) => newSnack.key === key).length;
  //   }

  //   return notExists;
  // }

  // public componentDidUpdate() {
  //   const { notifications = [] } = this.props;

  //   notifications.forEach(({ key, message, options = {} }: Notification) => {
  //     // Do nothing if snackbar is already displayed
  //     if (this.displayed.includes(key)) return;
  //     // Display snackbar using notistack
  //     this.props.enqueueSnackbar(message, {
  //       ...options,
  //       onClose: (event, reason, key) => {
  //         if (options.onClose) {
  //           options.onClose(event, reason, key);
  //         }
  //         // Dispatch action to remove snackbar from redux store
  //         this.props.removeSnackbar(key);
  //       },
  //     });
  //     // Keep track of snackbars that we've displayed
  //     this.storeDisplayed(key);
  //   });
  // }
}

const mapStateToProps = ({ notifications }: State) => ({
  notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier) as any);
