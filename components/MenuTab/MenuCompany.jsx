import React from 'react';
import { useRouter } from 'next/router';
import styles from './Tab.module.sass';
import ActiveLink from '../../utils/ActiveLink';

const menuCompany = () => {
  const router = useRouter();
  const { nameslug } = router.query;

  return (
    <ul className={styles.menu}>
      <li>
        <ActiveLink href="/company/[nameslug]/home" as={`/company/${nameslug}/home`} activeClassName={styles.active} scroll={false}>
          <a>Home</a>
        </ActiveLink>
      </li>
      <li>
        <span className={styles.disabled}>
          Carrers
        </span>
      </li>
    </ul>
  );
};

export default menuCompany;
