import type { ReactNode } from 'react';
import styles from './registrationUI.module.scss';

interface RegistrationUIProps {
  children: ReactNode; //registration form
  imageSrc: string; //image on th right side
  title: string; //title on the right side
  description: string; //description on the right side
}

export const RegistrationUI = ({
  children,
  imageSrc,
  title,
  description
}: RegistrationUIProps) => (
  <section className={styles.container}>
    <div className={styles.formContent}>{children}</div>

    <div className={styles.side}>
      <img src={imageSrc} alt={title} className={styles.sideImage} />
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  </section>
);
