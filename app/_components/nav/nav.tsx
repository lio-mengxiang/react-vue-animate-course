import React from 'react';
import Logo from '@/_components/logo';
import styles from './nav.module.css';
import { NavButton } from './navButton';

export function Nav() {
  return (
    <div className={styles.nav}>
      <Logo className={styles.logo} />
      <div className={styles.menu}>
        <NavButton word="React Gsap" stagger={0.01} />
      </div>
    </div>
  );
}
