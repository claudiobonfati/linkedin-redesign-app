import React from 'react';
// import Link from 'next/link';
import ActiveLink from '../../utils/ActiveLink';
import styles from './Tab.module.sass';

class MenuFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul className={styles.menu}>
        <li>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </li>
        <li>
          <a href="https://google.com">
            Articles
          </a>
        </li>
        <li>
          <ActiveLink href="/companies" activeClassName={styles.active}>
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
  }
}

export default MenuFeed;
