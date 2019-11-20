import { Dialog, DialogContent } from '@material-ui/core';
import React from 'react';

const Modal = ({ children, renderCta }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {renderCta({ handleClickOpen })}
      <Dialog
        open={open}
        maxWidth="xs"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
