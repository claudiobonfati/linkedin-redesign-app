import React from 'react';
import styles from './Tab.module.sass';

const menuCompany = () => (
  <ul className={styles.menu}>
    <li>
      <a href="https://google.com" className={styles.active}>
        Home
      </a>
    </li>
    <li>
      <a href="https://google.com">
        Carrers
      </a>
    </li>
  </ul>
);

export default menuCompany;
