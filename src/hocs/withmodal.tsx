import React from 'react';
import { Modal, ModalProps, Box } from '@mui/material';

interface WithModalOptions {
  modalProps?: ModalProps;
  containerProps?: React.CSSProperties;
}

export const withModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: WithModalOptions,
) => {
  const modalHOC: React.FC<
    P & {
      open: boolean;
      onClose: () => void;
      title: string;
      description: string;
    }
  > = ({ open, onClose, title, description, ...props }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title={title}
        aria-labelledby={`modal-${title}`}
        aria-describedby={`modal-${description}`}
        {...options?.modalProps}
      >
        <Box style={options?.containerProps}>
          <WrappedComponent {...(props as P)} />
        </Box>
      </Modal>
    );
  };

  return modalHOC;
};
