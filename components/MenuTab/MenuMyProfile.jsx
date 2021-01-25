import React from 'react';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

const menuMyProfile = () => (
  <ul className={styles.menu}>
    <li>
      <ActiveLink href="/me/details" activeClassName={styles.active} scroll={false}>
        <a>Details</a>
      </ActiveLink>
    </li>
    <li>
      <ActiveLink href="/me/posts" activeClassName={styles.active} scroll={false}>
        <a>Posts</a>
      </ActiveLink>
    </li>
    <li>
      <ActiveLink href="/me/contacts" activeClassName={styles.active} scroll={false}>
        <a>Contacts</a>
      </ActiveLink>
    </li>
    <li>
      <ActiveLink href="/me/improve" activeClassName={styles.active} scroll={false}>
        <a>Improve</a>
      </ActiveLink>
    </li>
  </ul>
);

export default menuMyProfile;
