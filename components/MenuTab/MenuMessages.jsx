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
      <ActiveLink href="/messages/unread" activeClassName={styles.active} scroll={false}>
        <a>Unread</a>
      </ActiveLink>
    </li>
  </ul>
);

export default menuMessages;
