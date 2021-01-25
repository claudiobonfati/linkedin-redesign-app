import React from 'react';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

const menuFeed = () => (
  <ul className={styles.menu}>
    <li>
      <ActiveLink href="/" activeClassName={styles.active} scroll={false}>
        <a>Posts</a>
      </ActiveLink>
    </li>
    <li>
      <ActiveLink href="/articles" activeClassName={styles.active} scroll={false}>
        <a>Articles</a>
      </ActiveLink>
    </li>
    <li>
      <ActiveLink href="/companies" activeClassName={styles.active} scroll={false}>
        <a>Companies</a>
      </ActiveLink>
    </li>
    <li>
      <a href="https://google.com">
        Jobs
      </a>
    </li>
  </ul>
);

export default menuFeed;
