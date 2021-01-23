import React from 'react';
import { useRouter } from 'next/router';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

const menuAccount = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <ul className={styles.menu}>
      <li>
        <ActiveLink href={`/profile/${username}/details`} activeClassName={styles.active}>
          <a>Details</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink href={`/profile/${username}/posts`} activeClassName={styles.active}>
          <a>Posts</a>
        </ActiveLink>
      </li>
    </ul>
  );
};

export default menuAccount;
