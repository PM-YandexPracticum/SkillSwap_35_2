/* eslint-disable react/prop-types */

import { memo } from 'react';
import type { FC } from 'react';
import { ModalOverlayUI } from '../modal-overlay/modal-overlay';
import { TitleUI } from '../title/title';

import styles from './modal.module.scss';
import type { TModalUIProps } from './type';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, description, onClose, children }) => (
    <>
      <div role='dialog' aria-modal='true' className={styles.modal}>
        <div className={styles.header}>
          {title ? <TitleUI size='H2' text={title} /> : null}
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);

ModalUI.displayName = 'ModalUI';
