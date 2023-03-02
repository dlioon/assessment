export interface ModalProps {
  readonly open: boolean;
  readonly onSubmit: (...rest: any) => void;
  readonly onClose: () => void;
}
