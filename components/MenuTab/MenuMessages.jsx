import React from 'react';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

const menuMessages = () => (
  <ul className={styles.menu}>
    <li>
      <ActiveLink href="/messages/all" activeClassName={styles.active} scroll={false}>
        <a>All messages</a>
      </ActiveLink>
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
