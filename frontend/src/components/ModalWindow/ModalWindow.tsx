import React from 'react';
import { Button, ButtonProps, Header, Icon, Modal } from 'semantic-ui-react';

type btnClick = (event: React.MouseEvent, data: ButtonProps) => void;

export const ModalWindow = (
  status: boolean,
  title: string,
  text: string,
  onCancel: btnClick | undefined,
  onOk: btnClick,
  saveButton: string,
  cancelButton?: string
): JSX.Element => (
  <Modal open={status}>
    <Header icon="archive" content={title} />
    <Modal.Content>
      <p>{text}</p>
    </Modal.Content>
    <Modal.Actions>
      {cancelButton !== undefined && onCancel !== undefined && (
        <Button onClick={onCancel} color="grey">
          <Icon name="remove" /> {cancelButton}
        </Button>
      )}
      <Button color="blue" onClick={onOk}>
        <Icon name="checkmark" /> {saveButton}
      </Button>
    </Modal.Actions>
  </Modal>
);
