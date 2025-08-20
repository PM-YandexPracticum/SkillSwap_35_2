/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './modal-overlay.module.scss';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div role='presentation' className={styles.overlay} onClick={onClick} />
);
