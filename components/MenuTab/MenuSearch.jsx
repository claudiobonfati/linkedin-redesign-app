import React from 'react';
import { useRouter } from 'next/router';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

const menuSearch = () => {
  const router = useRouter();
  const { keywords } = router.query;

  return (
    <ul className={styles.menu}>
      <li>
        <ActiveLink
          href={{
            pathname: '/search/people-companies',
            query: {
              keywords,
            },
          }}
          activeClassName={styles.active}
          scroll={false}
        >
          <a>People & Companies</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink
          href={{
            pathname: '/search/posts',
            query: {
              keywords,
            },
          }}
          activeClassName={styles.active}
          scroll={false}
        >
          <a>Posts</a>
        </ActiveLink>
      </li>
    </ul>
  );
};

export default menuSearch;
