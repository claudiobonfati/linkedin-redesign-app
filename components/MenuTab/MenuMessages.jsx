import React from 'react';
import styles from './Tab.module.sass';

const menuMessages = () => (
  <ul className={styles.menu}>
    <li>
      <a href="https://google.com" className={styles.active} scroll={false}>
        All messages
      </a>
    </li>
    <li>
      <a href="https://google.com">
        Unread
      </a>
    </li>
    <li>
      <a href="https://google.com">
        InMail
      </a>
    </li>
  </ul>
);

export default menuMessages;
