import {Modal} from 'shared/components';

type PasswordModalType = React.FC<{
  onDoned: (password: string) => {};
  isShowed: boolean;
  onClose: () => void;
}>;

export const PasswordModal: PasswordModalType = ({
  onDoned,
  isShowed,
  onClose,
}) => {
  return (
    <Modal isShowed={isShowed} onClose={onClose}>
      This is the password modal
    </Modal>
  );
};
