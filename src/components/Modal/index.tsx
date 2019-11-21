import { Dialog, DialogContent } from '@material-ui/core';
import React from 'react';

const Modal = ({ open, handleClose, children }: any) => (
  <Dialog
    open={open}
    maxWidth="xs"
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default Modal;
